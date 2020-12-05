/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface WarpVaultScFactoryIContract
  extends Truffle.Contract<WarpVaultScFactoryIInstance> {
  "new"(
    meta?: Truffle.TransactionDetails
  ): Promise<WarpVaultScFactoryIInstance>;
}

type AllEvents = never;

export interface WarpVaultScFactoryIInstance extends Truffle.ContractInstance {
  /**
   * createNewWarpVaultSC is used to create new WarpVaultSC contract instances
   * @param _InterestRate is the address of the InterestRateModel contract created for this Warp Vault
   * @param _StableCoin is the address of the stablecoin contract this WarpVault will manage
   * @param _initialExchangeRate is the exchange rate mantissa used to determine the initial exchange rate of stablecoin to warp stablecoin
   * @param _timelock is a variable representing the number of seconds the timeWizard will prevent withdraws and borrows from a contracts(one week is 605800 seconds)*
   * @param _warpTeam is the address of the Warp Team used for fees
   */
  createNewWarpVaultSC: {
    (
      _InterestRate: string,
      _StableCoin: string,
      _warpTeam: string,
      _initialExchangeRate: number | BN | string,
      _timelock: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _InterestRate: string,
      _StableCoin: string,
      _warpTeam: string,
      _initialExchangeRate: number | BN | string,
      _timelock: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    sendTransaction(
      _InterestRate: string,
      _StableCoin: string,
      _warpTeam: string,
      _initialExchangeRate: number | BN | string,
      _timelock: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _InterestRate: string,
      _StableCoin: string,
      _warpTeam: string,
      _initialExchangeRate: number | BN | string,
      _timelock: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    /**
     * createNewWarpVaultSC is used to create new WarpVaultSC contract instances
     * @param _InterestRate is the address of the InterestRateModel contract created for this Warp Vault
     * @param _StableCoin is the address of the stablecoin contract this WarpVault will manage
     * @param _initialExchangeRate is the exchange rate mantissa used to determine the initial exchange rate of stablecoin to warp stablecoin
     * @param _timelock is a variable representing the number of seconds the timeWizard will prevent withdraws and borrows from a contracts(one week is 605800 seconds)*
     * @param _warpTeam is the address of the Warp Team used for fees
     */
    createNewWarpVaultSC: {
      (
        _InterestRate: string,
        _StableCoin: string,
        _warpTeam: string,
        _initialExchangeRate: number | BN | string,
        _timelock: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _InterestRate: string,
        _StableCoin: string,
        _warpTeam: string,
        _initialExchangeRate: number | BN | string,
        _timelock: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      sendTransaction(
        _InterestRate: string,
        _StableCoin: string,
        _warpTeam: string,
        _initialExchangeRate: number | BN | string,
        _timelock: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _InterestRate: string,
        _StableCoin: string,
        _warpTeam: string,
        _initialExchangeRate: number | BN | string,
        _timelock: number | BN | string,
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