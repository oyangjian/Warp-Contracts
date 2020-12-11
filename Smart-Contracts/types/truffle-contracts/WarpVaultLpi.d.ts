/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface WarpVaultLpiContract
  extends Truffle.Contract<WarpVaultLpiInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<WarpVaultLpiInstance>;
}

type AllEvents = never;

export interface WarpVaultLpiInstance extends Truffle.ContractInstance {
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

  methods: {
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
