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

export interface AccountLiquidated {
  name: "AccountLiquidated";
  args: {
    _account: string;
    _liquidator: string;
    _amount: BN;
    0: string;
    1: string;
    2: BN;
  };
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
    _amount: BN;
    0: string;
    1: BN;
  };
}

export interface WarpControlChanged {
  name: "WarpControlChanged";
  args: {
    _newControl: string;
    _oldControl: string;
    0: string;
    1: string;
  };
}

type AllEvents =
  | AccountLiquidated
  | CollateralProvided
  | CollateralWithdraw
  | WarpControlChanged;

export interface WarpVaultLpInstance extends Truffle.ContractInstance {
  LPtoken(txDetails?: Truffle.TransactionDetails): Promise<string>;

  collateralizedLP(
    arg0: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  lpName(txDetails?: Truffle.TransactionDetails): Promise<string>;

  timeWizard(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  warpControl(txDetails?: Truffle.TransactionDetails): Promise<string>;

  updateWarpControl: {
    (_warpControl: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      _warpControl: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _warpControl: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _warpControl: string,
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
   * this function uses the onlyWarpControl modifier meaning that only the Warp Control contract can call it*
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

    collateralizedLP(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    lpName(txDetails?: Truffle.TransactionDetails): Promise<string>;

    timeWizard(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    warpControl(txDetails?: Truffle.TransactionDetails): Promise<string>;

    updateWarpControl: {
      (_warpControl: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _warpControl: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _warpControl: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _warpControl: string,
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
     * this function uses the onlyWarpControl modifier meaning that only the Warp Control contract can call it*
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
