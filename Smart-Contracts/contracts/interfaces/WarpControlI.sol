pragma solidity ^0.6.0;

////////////////////////////////////////////////////////////////////////////////////////////
/// @title WarpVaultI
/// @author Christopher Dixon
////////////////////////////////////////////////////////////////////////////////////////////
/**
The WarpVaultI contract an abstract contract the MoneyMarketFactory uses to interface
    eith the UniswapOracleFactory. This is necissary as the OpenZeppelin and Uniswap libraries cause a
    truffle compiler error due when imported into the same contract due to the use of two seperate
    SafeMath instances
**/

abstract contract WarpControlI {
    address public DAI;
    address public USDC;
    address public USDT;

    function trackCollateralUp(
        address _borrower,
        address _WarpVault,
        uint256 _amount
    ) external virtual;

    function trackCollateralDown(
        address _borrower,
        address _WarpVault,
        uint256 _amount
    ) external virtual;

    function lockCollateralUp(
        address _borrower,
        address _WarpVault,
        uint256 _amount
    ) external virtual;

    function lockCollateralDown(
        address _borrower,
        address _redeemer,
        address _WarpVault,
        uint256 _amount
    ) external virtual;

    function checkAvailibleCollateralValue(
        address _borrower,
        address _WarpVault
    ) external view virtual returns (uint256);

    function checkLockedCollateralValue(address _borrower, address _WarpVault)
        external
        view
        virtual
        returns (uint256);

    function checkLockedCollateral(address _borrower, address _WarpVault)
        external
        view
        virtual
        returns (uint256);
}