/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface WarpVaultLpContract
  extends Truffle.Contract<WarpVaultLpInstance> {
  "new"(
    _timelock: number | BN | string,
    _lp: string,
    _WarpControl: string,
    _lpName: string,
    meta?: Truffle.TransactionDetails
  ): Promise<WarpVaultLpInstance>;
}

export interface CollateralProvided {
  name: "CollateralProvided";
  args: {
    _account: string;
    _amount: BN;
    0: string;
    1: BN;
  };
}

export interface CollateralWithdraw {
  name: "CollateralWithdraw";
  args: {
    _account: string;
    amount: BN;
    0: string;
    1: BN;
  };
}

export interface OwnershipTransferred {
  name: "OwnershipTransferred";
  args: {
    previousOwner: string;
    newOwner: string;
    0: string;
    1: string;
  };
}

type AllEvents = CollateralProvided | CollateralWithdraw | OwnershipTransferred;

export interface WarpVaultLpInstance extends Truffle.ContractInstance {
  LPtoken(txDetails?: Truffle.TransactionDetails): Promise<string>;

  WC(txDetails?: Truffle.TransactionDetails): Promise<string>;

  WLP(txDetails?: Truffle.TransactionDetails): Promise<string>;

  collateralizedLP(
    arg0: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  lpName(txDetails?: Truffle.TransactionDetails): Promise<string>;

  /**
   * Returns the address of the current owner.
   */
  owner(txDetails?: Truffle.TransactionDetails): Promise<string>;

  /**
   * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner.     * NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
   */
  renounceOwnership: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  timeWizard(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  /**
   * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
   */
  transferOwnership: {
    (newOwner: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      newOwner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      newOwner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      newOwner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  /**
   * provideCollateral allows a user to collateralize this contracts associated LP token
   * @param _amount is the amount of LP being collateralized*
   */
  provideCollateral: {
    (
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  /**
   * withdrawCollateral allows the user to trade in his WarpLP tokens for hiss underlying LP token collateral
   * @param _amount is the amount of LP tokens he wishes to withdraw*
   */
  withdrawCollateral: {
    (
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  /**
   * getAssetAdd allows for easy retrieval of a WarpVaults LP token Adress*
   */
  getAssetAdd(txDetails?: Truffle.TransactionDetails): Promise<string>;

  /**
   * collateralOfAccount is a view function to retreive an accounts collateralized LP amount
   * @param _account is the address of the account being looked up*
   */
  collateralOfAccount(
    _account: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  /**
   * this function uses the onlyWC modifier meaning that only the Warp Control contract can call it*
   * _liquidateAccount is a function to liquidate the LP tokens of the input account
   * @param _account is the address of the account being liquidated
   * @param _liquidator is the address of the account doing the liquidating who receives the liquidated LP's
   */
  _liquidateAccount: {
    (
      _account: string,
      _liquidator: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _account: string,
      _liquidator: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _account: string,
      _liquidator: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _account: string,
      _liquidator: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  valueOfAccountCollateral(
    _account: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  methods: {
    LPtoken(txDetails?: Truffle.TransactionDetails): Promise<string>;

    WC(txDetails?: Truffle.TransactionDetails): Promise<string>;

    WLP(txDetails?: Truffle.TransactionDetails): Promise<string>;

    collateralizedLP(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    lpName(txDetails?: Truffle.TransactionDetails): Promise<string>;

    /**
     * Returns the address of the current owner.
     */
    owner(txDetails?: Truffle.TransactionDetails): Promise<string>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner.     * NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    timeWizard(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership: {
      (newOwner: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        newOwner: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        newOwner: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        newOwner: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    /**
     * provideCollateral allows a user to collateralize this contracts associated LP token
     * @param _amount is the amount of LP being collateralized*
     */
    provideCollateral: {
      (
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    /**
     * withdrawCollateral allows the user to trade in his WarpLP tokens for hiss underlying LP token collateral
     * @param _amount is the amount of LP tokens he wishes to withdraw*
     */
    withdrawCollateral: {
      (
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    /**
     * getAssetAdd allows for easy retrieval of a WarpVaults LP token Adress*
     */
    getAssetAdd(txDetails?: Truffle.TransactionDetails): Promise<string>;

    /**
     * collateralOfAccount is a view function to retreive an accounts collateralized LP amount
     * @param _account is the address of the account being looked up*
     */
    collateralOfAccount(
      _account: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    /**
     * this function uses the onlyWC modifier meaning that only the Warp Control contract can call it*
     * _liquidateAccount is a function to liquidate the LP tokens of the input account
     * @param _account is the address of the account being liquidated
     * @param _liquidator is the address of the account doing the liquidating who receives the liquidated LP's
     */
    _liquidateAccount: {
      (
        _account: string,
        _liquidator: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _account: string,
        _liquidator: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _account: string,
        _liquidator: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _account: string,
        _liquidator: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    valueOfAccountCollateral(
      _account: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;
  };

  getPastEvents(event: string): Promise<EventData[]>;
  getPastEvents(
    event: string,
    options: PastEventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
  getPastEvents(
    event: string,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
}
