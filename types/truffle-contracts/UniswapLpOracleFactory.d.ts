/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface UniswapLpOracleFactoryContract
  extends Truffle.Contract<UniswapLpOracleFactoryInstance> {
  "new"(
    usdcAdd: string,
    _uniFactoryAdd: string,
    _uniRouterAddress: string,
    meta?: Truffle.TransactionDetails
  ): Promise<UniswapLpOracleFactoryInstance>;
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

type AllEvents = OwnershipTransferred;

export interface UniswapLpOracleFactoryInstance
  extends Truffle.ContractInstance {
  LPAssetTracker(
    arg0: string,
    arg1: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  factory(txDetails?: Truffle.TransactionDetails): Promise<string>;

  instanceTracker(
    arg0: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

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

  tokenToUSDC(
    arg0: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

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

  uniswapRouter(txDetails?: Truffle.TransactionDetails): Promise<string>;

  usdc_add(txDetails?: Truffle.TransactionDetails): Promise<string>;

  USDC(txDetails?: Truffle.TransactionDetails): Promise<string>;

  OneUSDC(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  OneToken(token: string, txDetails?: Truffle.TransactionDetails): Promise<BN>;

  /**
   * createNewOracle allows the owner of this contract to deploy deploy two new asset oracle contracts when a new LP token is whitelisted. this contract will link the address of an LP token contract to two seperate oracles that are designed to look up the price of their respective assets in USDC. This will allow us to calculate the price of one at LP token token from the prices of their underlying assets
   * @param _lpToken is the address of the token that this oracle will provide a price feed for*
   * @param _tokenA is the address of the first token in an Liquidity pair
   * @param _tokenB is the address of the second token in a liquidity pair
   */
  createNewOracles: {
    (
      _tokenA: string,
      _tokenB: string,
      _lpToken: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _tokenA: string,
      _tokenB: string,
      _lpToken: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _tokenA: string,
      _tokenB: string,
      _lpToken: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _tokenA: string,
      _tokenB: string,
      _lpToken: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  /**
   * getUnderlyingPrice allows for the price calculation and retrieval of a LP tokens price
   * @param _lpToken is the address of the LP token  whos asset price is being retrieved
   */
  getUnderlyingPrice: {
    (_lpToken: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(_lpToken: string, txDetails?: Truffle.TransactionDetails): Promise<BN>;
    sendTransaction(
      _lpToken: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _lpToken: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  _calculatePriceOfLP(
    supply: number | BN | string,
    value0: number | BN | string,
    value1: number | BN | string,
    supplyDecimals: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  /**
   * viewUnderlyingPrice allows for the price retrieval of a LP tokens price
   * @param _lpToken is the address of the LP token  whos asset price is being retrieved
   */
  viewUnderlyingPrice(
    _lpToken: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  viewPriceOfToken(
    _token: string,
    _amount: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getPriceOfToken: {
    (
      _token: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _token: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;
    sendTransaction(
      _token: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _token: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    LPAssetTracker(
      arg0: string,
      arg1: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    factory(txDetails?: Truffle.TransactionDetails): Promise<string>;

    instanceTracker(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

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

    tokenToUSDC(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

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

    uniswapRouter(txDetails?: Truffle.TransactionDetails): Promise<string>;

    usdc_add(txDetails?: Truffle.TransactionDetails): Promise<string>;

    USDC(txDetails?: Truffle.TransactionDetails): Promise<string>;

    OneUSDC(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    OneToken(
      token: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    /**
     * createNewOracle allows the owner of this contract to deploy deploy two new asset oracle contracts when a new LP token is whitelisted. this contract will link the address of an LP token contract to two seperate oracles that are designed to look up the price of their respective assets in USDC. This will allow us to calculate the price of one at LP token token from the prices of their underlying assets
     * @param _lpToken is the address of the token that this oracle will provide a price feed for*
     * @param _tokenA is the address of the first token in an Liquidity pair
     * @param _tokenB is the address of the second token in a liquidity pair
     */
    createNewOracles: {
      (
        _tokenA: string,
        _tokenB: string,
        _lpToken: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _tokenA: string,
        _tokenB: string,
        _lpToken: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _tokenA: string,
        _tokenB: string,
        _lpToken: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _tokenA: string,
        _tokenB: string,
        _lpToken: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    /**
     * getUnderlyingPrice allows for the price calculation and retrieval of a LP tokens price
     * @param _lpToken is the address of the LP token  whos asset price is being retrieved
     */
    getUnderlyingPrice: {
      (_lpToken: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _lpToken: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN>;
      sendTransaction(
        _lpToken: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _lpToken: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    _calculatePriceOfLP(
      supply: number | BN | string,
      value0: number | BN | string,
      value1: number | BN | string,
      supplyDecimals: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    /**
     * viewUnderlyingPrice allows for the price retrieval of a LP tokens price
     * @param _lpToken is the address of the LP token  whos asset price is being retrieved
     */
    viewUnderlyingPrice(
      _lpToken: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    viewPriceOfToken(
      _token: string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getPriceOfToken: {
      (
        _token: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _token: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN>;
      sendTransaction(
        _token: string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _token: string,
        _amount: number | BN | string,
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
