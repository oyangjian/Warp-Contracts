pragma solidity ^0.6.2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./compound/Exponential.sol";
import "./compound/InterestRateModel.sol";
import "./interfaces/UniswapLPOracleFactoryI.sol";
import "./WarpWrapperToken.sol";
import "./interfaces/WarpControlI.sol";

////////////////////////////////////////////////////////////////////////////////////////////
/// @title WarpVaultSC
/// @author Christopher Dixon
////////////////////////////////////////////////////////////////////////////////////////////
/**
@notice the WarpVaultSC contract is the main point of interface for a specific LP asset class and an end user in the
Warp lending platform. This contract is responsible for distributing WarpWrapper tokens in exchange for stablecoin assets,
holding and accounting of stablecoins and LP tokens and all associates lending/borrowing calculations for a specific Warp LP asset class.
This contract inherits Ownership and ERC20 functionality from the Open Zeppelin Library as well as Exponential and the InterestRateModel contracts
from the coumpound protocol.
**/

contract WarpVaultSC is Ownable, Exponential {
    using SafeMath for uint256;

    uint256 internal initialExchangeRateMantissa;
    uint256 public reserveFactorMantissa;
    uint256 public accrualBlockNumber;
    uint256 public borrowIndex;
    uint256 public totalBorrows;
    uint256 public totalReserves;
    uint256 internal constant borrowRateMaxMantissa = 0.0005e16;
    uint256 internal constant reserveFactorMaxMantissa = 1e18;
    uint256 public liquidationIncentiveMantissa = 1.5e18; // 1.5

    ERC20 public stablecoin;
    WarpWrapperToken public wStableCoin;
    WarpControlI public WC;
    InterestRateModel public InterestRate;

    mapping(address => BorrowSnapshot) public accountBorrows;
    mapping(address => uint256) public principalBalance;
    mapping(address => uint256) public historicalReward;
    mapping(address => address) public collateralAddressTracker;
    mapping(address => bool) public collateralLocked;

    /**
    @notice struct for borrow balance information
    @member principal Total balance (with accrued interest), after applying the most recent balance-changing action
    @member interestIndex Global borrowIndex as of the most recent balance-changing action
    */
    struct BorrowSnapshot {
        uint256 principal;
        uint256 interestIndex;
    }

    /**
     * @dev Throws if called by any account other than a warp control
     */
    modifier onlyWC() {
        require(msg.sender == address(WC));
        _;
    }

    /**
    @notice constructor sets up token names and symbols for the WarpWrapperToken

    **/
    constructor(
        address _InterestRate,
        address _StableCoin,
        address _warpControl,
        uint256 _initialExchangeRate
    ) public {
        WC = WarpControlI(_warpControl);
        stablecoin = ERC20(_StableCoin);
        InterestRate = InterestRateModel(_InterestRate);
        accrualBlockNumber = getBlockNumber();
        borrowIndex = mantissaOne;
        initialExchangeRateMantissa = _initialExchangeRate; //sets the initialExchangeRateMantissa
        wStableCoin = new WarpWrapperToken(
            address(stablecoin),
            stablecoin.name(),
            stablecoin.symbol()
        );
    }

    /**
    @notice getCashPrior is a view funcion that returns the USD balance of all held underlying stablecoin assets
    **/
    function getCashPrior() internal view returns (uint256) {
        return stablecoin.balanceOf(address(this));
    }

    /**
    @notice Applies accrued interest to total borrows and reserves
    @dev This calculates interest accrued from the last checkpointed block
        up to the current block and writes new checkpoint to storage.
    **/
    function accrueInterest() public {
        //Remember the initial block number
        uint256 currentBlockNumber = getBlockNumber();
        uint256 accrualBlockNumberPrior = accrualBlockNumber;
        //Short-circuit accumulating 0 interest
        require(accrualBlockNumberPrior != currentBlockNumber, "Trying to accrue interest twice");
        //Read the previous values out of storage
        uint256 cashPrior = getCashPrior();
        uint256 borrowsPrior = totalBorrows;
        uint256 reservesPrior = totalReserves;
        uint256 borrowIndexPrior = borrowIndex;
        //Calculate the current borrow interest rate
        uint256 borrowRateMantissa = InterestRate.getBorrowRate(
            cashPrior,
            borrowsPrior,
            reservesPrior
        );
        require(borrowRateMantissa <= borrowRateMaxMantissa, "Borrow Rate mantissa error");
        //Calculate the number of blocks elapsed since the last accrual
        (MathError mathErr, uint256 blockDelta) = subUInt(
            currentBlockNumber,
            accrualBlockNumberPrior
        );
        //Calculate the interest accumulated into borrows and reserves and the new index:
        Exp memory simpleInterestFactor;
        uint256 interestAccumulated;
        uint256 totalBorrowsNew;
        uint256 totalReservesNew;
        uint256 borrowIndexNew;
        //simpleInterestFactor = borrowRate * blockDelta
        (mathErr, simpleInterestFactor) = mulScalar(
            Exp({mantissa: borrowRateMantissa}),
            blockDelta
        );
        //interestAccumulated = simpleInterestFactor * totalBorrows
        (mathErr, interestAccumulated) = mulScalarTruncate(
            simpleInterestFactor,
            borrowsPrior
        );
        //totalBorrowsNew = interestAccumulated + totalBorrows
        (mathErr, totalBorrowsNew) = addUInt(interestAccumulated, borrowsPrior);
        //totalReservesNew = interestAccumulated * reserveFactor + totalReserves
        (mathErr, totalReservesNew) = mulScalarTruncateAddUInt(
            Exp({mantissa: reserveFactorMantissa}),
            interestAccumulated,
            reservesPrior
        );
        //borrowIndexNew = simpleInterestFactor * borrowIndex + borrowIndex
        (mathErr, borrowIndexNew) = mulScalarTruncateAddUInt(
            simpleInterestFactor,
            borrowIndexPrior,
            borrowIndexPrior
        );

        //Write the previously calculated values into storage
        accrualBlockNumber = currentBlockNumber;
        borrowIndex = borrowIndexNew;
        totalBorrows = totalBorrowsNew;
        totalReserves = totalReservesNew;
    }

    /**
    @notice returns last calculated account's borrow balance using the prior borrowIndex
    @param account The address whose balance should be calculated after updating borrowIndex
    @return The calculated balance
    **/
    function borrowBalancePrior(address account) public view returns (uint256) {
        MathError mathErr;
        uint256 principalTimesIndex;
        uint256 result;

        //Get borrowBalance and borrowIndex
        BorrowSnapshot storage borrowSnapshot = accountBorrows[account];
        //If borrowBalance = 0 then borrowIndex is likely also 0.
        //Rather than failing the calculation with a division by 0, we immediately return 0 in this case.
        if (borrowSnapshot.principal == 0) {
            return (0);
        }
        //Calculate new borrow balance using the interest index:
        //recentBorrowBalance = borrower.borrowBalance * market.borrowIndex / borrower.borrowIndex
        (mathErr, principalTimesIndex) = mulUInt(
            borrowSnapshot.principal,
            borrowIndex
        );
        //if theres a math error return zero so as not to fail
        if (mathErr != MathError.NO_ERROR) {
            return (0);
        }
        (mathErr, result) = divUInt(
            principalTimesIndex,
            borrowSnapshot.interestIndex
        );
        //if theres a math error return zero so as not to fail
        if (mathErr != MathError.NO_ERROR) {
            return (0);
        }
        return (result);
    }

    /**
    @notice Accrue interest to updated borrowIndex and then calculate account's borrow balance using the updated borrowIndex
    @param account The address whose balance should be calculated after updating borrowIndex
    @return The calculated balance
    **/
    function borrowBalanceCurrent(address account) public returns (uint256) {
        accrueInterest();
        return borrowBalancePrior(account);
    }

    /**
    @notice getBlockNumber allows for easy retrieval of block number
    **/
    function getBlockNumber() internal view returns (uint256) {
        return block.number;
    }

    /**
    @notice Returns the current per-block borrow interest rate for this cToken
    @return The borrow interest rate per block, scaled by 1e18
    **/
    function borrowRatePerBlock() public view returns (uint256) {
        return
            InterestRate.getBorrowRate(
                getCashPrior(),
                totalBorrows,
                totalReserves
            );
    }

    /**
    @notice Returns the current per-block supply interest rate for this cToken
    @return The supply interest rate per block, scaled by 1e18
    **/
    function supplyRatePerBlock() public view returns (uint256) {
        return
            InterestRate.getSupplyRate(
                getCashPrior(),
                totalBorrows,
                totalReserves,
                reserveFactorMantissa
            );
    }

    /**
     @notice Returns the current total borrows plus accrued interest
     @return The total borrows with interest
     **/
    function totalBorrowsCurrent() external returns (uint256) {
        accrueInterest();
        return totalBorrows;
    }

    /**
    @notice  return the not up-to-date exchange rate
    @return Calculated exchange rate scaled by 1e18
    **/
    function exchangeRatePrior() public view returns (uint256) {
        if (wStableCoin.totalSupply() == 0) {
            //If there are no tokens minted: exchangeRate = initialExchangeRate
            return initialExchangeRateMantissa;
        } else {
            //Otherwise: exchangeRate = (totalCash + totalBorrows - totalReserves) / totalSupply
            uint256 totalCash = getCashPrior(); //get contract asset balance
            uint256 cashPlusBorrowsMinusReserves;
            Exp memory exchangeRate;
            MathError mathErr;
            //calculate total value held by contract plus owed to contract
            (mathErr, cashPlusBorrowsMinusReserves) = addThenSubUInt(
                totalCash,
                totalBorrows,
                totalReserves
            );
            //calculate exchange rate
            (mathErr, exchangeRate) = getExp(
                cashPlusBorrowsMinusReserves,
                wStableCoin.totalSupply()
            );
            return (exchangeRate.mantissa);
        }
    }

    /**
     @notice Accrue interest then return the up-to-date exchange rate
     @return Calculated exchange rate scaled by 1e18
     **/
    function exchangeRateCurrent() public returns (uint256) {
        accrueInterest();

        if (wStableCoin.totalSupply() == 0) {
            //If there are no tokens minted: exchangeRate = initialExchangeRate
            return initialExchangeRateMantissa;
        } else {
            //Otherwise: exchangeRate = (totalCash + totalBorrows - totalReserves) / totalSupply
            uint256 totalCash = getCashPrior(); //get contract asset balance
            uint256 cashPlusBorrowsMinusReserves;
            Exp memory exchangeRate;
            MathError mathErr;
            //calculate total value held by contract plus owed to contract
            (mathErr, cashPlusBorrowsMinusReserves) = addThenSubUInt(
                totalCash,
                totalBorrows,
                totalReserves
            );
            //calculate exchange rate
            (mathErr, exchangeRate) = getExp(
                cashPlusBorrowsMinusReserves,
                wStableCoin.totalSupply()
            );
            return (exchangeRate.mantissa);
        }
    }

    /**
    @notice Get cash balance of this cToken in the underlying asset in other contracts
    @return The quantity of underlying asset owned by this contract
    **/
    function getCash() external view returns (uint256) {
        return getCashPrior();
    }

    //struct used by mint to avoid stack too deep errors
    struct MintLocalVars {
        MathError mathErr;
        uint256 exchangeRateMantissa;
        uint256 mintTokens;
    }

    /**
    @notice lendToWarpVault is used to lend stablecoin assets to a WaprVault
    @param _amount is the amount of the asset being lent
    @dev the user will need to first approve the transfer of the underlying asset
    **/
    function lendToWarpVault(uint256 _amount) public {
        //declare struct
        MintLocalVars memory vars;
        //retrieve exchange rate
        vars.exchangeRateMantissa = exchangeRateCurrent();
        //We get the current exchange rate and calculate the number of WarpWrapperToken to be minted:
        //mintTokens = _amount / exchangeRate
        (vars.mathErr, vars.mintTokens) = divScalarByExpTruncate(
            _amount,
            Exp({mantissa: vars.exchangeRateMantissa})
        );

        //transfer appropriate amount of DAI from msg.sender to the Vault
        stablecoin.transferFrom(msg.sender, address(this), _amount);

        principalBalance[msg.sender] = principalBalance[msg.sender] + _amount;
        //mint appropriate Warp DAI
        wStableCoin.mint(msg.sender, vars.mintTokens);
    }

    struct RedeemLocalVars {
        MathError mathErr;
        uint256 exchangeRateMantissa;
        uint256 redeemAmount;
        uint256 currentWarpBalance;
        uint256 currentCoinBalance;
    }

    /**
    @notice redeem allows a user to redeem their Warp Wrapper Token for the appropriate amount of underlying stablecoin asset
    @param _amount is the amount of Warp Wrapper token being exchanged
    **/
    function redeem(uint256 _amount) public {

        RedeemLocalVars memory vars;

        vars.currentWarpBalance = wStableCoin.balanceOf(msg.sender);
        require(_amount < vars.currentWarpBalance, "Cannot redeem more Warp-SC than is in your account.");

        vars.exchangeRateMantissa = exchangeRateCurrent();

        if (_amount > 0) {
            (vars.mathErr, vars.redeemAmount) = mulScalarTruncate(
                Exp({mantissa: vars.exchangeRateMantissa}),
                _amount
            );
        } else {
            // Withdraw everything if withdraw amount is zero
            vars.redeemAmount = vars.currentWarpBalance;
        }



        (vars.mathErr, vars.currentCoinBalance) = mulScalarTruncate(
            Exp({mantissa: vars.exchangeRateMantissa}),
            vars.currentWarpBalance
        );

        require(stablecoin.balanceOf(address(this)) >= vars.redeemAmount, "Not enough stablecoin in vault.");



        uint256 currentStableCoinReward = 0;
        if (vars.currentCoinBalance > principalBalance[msg.sender]) {
            currentStableCoinReward = vars.currentCoinBalance.sub(principalBalance[msg.sender]);
        }

        if (vars.redeemAmount >= currentStableCoinReward) {
            historicalReward[msg.sender] = historicalReward[msg.sender].add(currentStableCoinReward);
            uint256 principalRedeemed = vars.redeemAmount.sub(currentStableCoinReward);
            require(principalRedeemed <= principalBalance[msg.sender], "Error calculating reward.");
            principalBalance[msg.sender] = principalBalance[msg.sender].sub(principalRedeemed);
        } else {
            historicalReward[msg.sender] = historicalReward[msg.sender].add(vars.redeemAmount);
        }
        // Take away Warp Tokens and exchange for StableCoin
        wStableCoin.burn(msg.sender, _amount);
        stablecoin.transfer(msg.sender, vars.redeemAmount);
    }

    function viewAccountBalance(address _account) public view returns (uint256) {
        uint256 exchangeRate = exchangeRatePrior();
        uint256 accountBalance = wStableCoin.balanceOf(_account);

        MathError mathError;
        uint256 balance;
       (mathError, balance) =  mulScalarTruncate(
            Exp({mantissa: exchangeRate}),
            accountBalance
        );

        return accountBalance;
    }

    function viewHistoricalReward(address _account) public view returns (uint256) {
        uint256 exchangeRate = exchangeRatePrior();
        uint256 currentWarpBalance = wStableCoin.balanceOf(_account);
        uint256 principal = principalBalance[_account];

        if (currentWarpBalance == 0) {
            return historicalReward[_account];
        }

        MathError mathError;
        uint256 currentStableCoinBalance;
        (mathError, currentStableCoinBalance) =  mulScalarTruncate(
            Exp({mantissa: exchangeRate}),
            currentWarpBalance
        );

        uint256 currentGains = currentStableCoinBalance.sub(principal);
        uint256 totalGains = currentGains.add(historicalReward[_account]);

        return totalGains;
    }

    //struct used by borrow function to avoid stack too deep errors
    struct BorrowLocalVars {
        MathError mathErr;
        uint256 accountBorrows;
        uint256 accountBorrowsNew;
        uint256 totalBorrowsNew;
    }

    /**
    @notice Sender borrows stablecoin assets from the protocol to their own address
    @param _borrowAmount The amount of the underlying asset to borrow
    */
    function _borrow(uint256 _borrowAmount, address _borrower) external onlyWC {
        //create local vars storage
        BorrowLocalVars memory vars;

        //Fail if protocol has insufficient underlying cash
        require(getCashPrior() > _borrowAmount, "Not enough tokens to lend");
        //calculate the new borrower and total borrow balances, failing on overflow:
        vars.accountBorrows = borrowBalancePrior(_borrower);
        //accountBorrowsNew = accountBorrows + borrowAmount
        (vars.mathErr, vars.accountBorrowsNew) = addUInt(
            vars.accountBorrows,
            _borrowAmount
        );
        //totalBorrowsNew = totalBorrows + borrowAmount
        (vars.mathErr, vars.totalBorrowsNew) = addUInt(
            totalBorrows,
            _borrowAmount
        );
        //We write the previously calculated values into storage
        accountBorrows[_borrower].principal = vars.accountBorrowsNew;
        accountBorrows[_borrower].interestIndex = borrowIndex;
        totalBorrows = vars.totalBorrowsNew;
        //send them their loaned asset
        stablecoin.transfer(_borrower, _borrowAmount);
    }

    struct RepayBorrowLocalVars {
        MathError mathErr;
        uint256 repayAmount;
        uint256 borrowerIndex;
        uint256 accountBorrows;
        uint256 accountBorrowsNew;
        uint256 totalBorrowsNew;
        uint256 totalOwed;
        uint256 lockedCollateral;
    }

    /**
    @notice Sender repays their own borrow
    @param repayAmount The amount to repay
    */
    function repayBorrow(uint256 repayAmount) public {
        accrueInterest();

        //create local vars storage
        RepayBorrowLocalVars memory vars;


        //We remember the original borrowerIndex for verification purposes
        vars.borrowerIndex = accountBorrows[msg.sender].interestIndex;
        //We fetch the amount the borrower owes, with accumulated interest
        vars.accountBorrows = borrowBalancePrior(msg.sender);
        //If repayAmount == 0, repayAmount = accountBorrows
        if (repayAmount == 0) {
            vars.repayAmount = vars.accountBorrows;
        } else {
            vars.repayAmount = repayAmount;
        }

        require(stablecoin.balanceOf(msg.sender) >= vars.repayAmount, "Not enough stablecoin to repay");
        stablecoin.transferFrom(msg.sender, address(this), vars.repayAmount);

        //We calculate the new borrower and total borrow balances
        //accountBorrowsNew = accountBorrows - actualRepayAmount
        (vars.mathErr, vars.accountBorrowsNew) = subUInt(
            vars.accountBorrows,
            vars.repayAmount
        );
        //totalBorrowsNew = totalBorrows - actualRepayAmount
        (vars.mathErr, vars.totalBorrowsNew) = subUInt(
            totalBorrows,
            vars.repayAmount
        );
        /* We write the previously calculated values into storage */
        accountBorrows[msg.sender].principal = vars.accountBorrowsNew;
        accountBorrows[msg.sender].interestIndex = borrowIndex;
        totalBorrows = vars.totalBorrowsNew;
        vars.totalOwed = accountBorrows[msg.sender].principal.add(
            accountBorrows[msg.sender].interestIndex
        );
    }

    /**
    @notice repayLiquidatedLoan is a function used by the Warp Control contract to repay a loan on behalf of a liquidator
    @param _borrower is the address of the borrower who took out the loan
    @param _liquidator is the address of the account who is liquidating the loan
    @param _amount is the amount of StableCoin being repayed
    @dev this function uses the onlyWC modifier which means it can only be called by the Warp Control contract
    **/
    function _repayLiquidatedLoan(
        address _borrower,
        address _liquidator,
        uint256 _amount
    ) public onlyWC {
        //transfer the owed amount of stablecoin from the borrower to this contract
        stablecoin.transferFrom(_liquidator, address(this), _amount);
        // Clear the borrowers loan
        accountBorrows[_borrower].principal = 0;
        accountBorrows[_borrower].interestIndex = 0;
        totalBorrows = totalBorrows.sub(_amount);
    }
}