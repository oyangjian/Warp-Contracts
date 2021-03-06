/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { BaseJumpRateModelV2Contract } from "./BaseJumpRateModelV2";
import { DaiContract } from "./Dai";
import { Erc20Contract } from "./Erc20";
import { ExtendedIerc20Contract } from "./ExtendedIerc20";
import { Ierc20Contract } from "./Ierc20";
import { InterestRateModelContract } from "./InterestRateModel";
import { IUniswapV2FactoryContract } from "./IUniswapV2Factory";
import { IUniswapV2PairContract } from "./IUniswapV2Pair";
import { IUniswapV2Router01Contract } from "./IUniswapV2Router01";
import { IUniswapV2Router02Contract } from "./IUniswapV2Router02";
import { IwethContract } from "./Iweth";
import { JumpRateModelV2Contract } from "./JumpRateModelV2";
import { MigrationsContract } from "./Migrations";
import { OwnableContract } from "./Ownable";
import { TesterTokenContract } from "./TesterToken";
import { TetherTokenContract } from "./TetherToken";
import { UniswapLpOracleFactoryContract } from "./UniswapLpOracleFactory";
import { UniswapLpOracleFactoryIContract } from "./UniswapLpOracleFactoryI";
import { UniswapLpOracleInstanceContract } from "./UniswapLpOracleInstance";
import { UniswapV2FactoryContract } from "./UniswapV2Factory";
import { UniswapV2PairContract } from "./UniswapV2Pair";
import { UniswapV2Router02Contract } from "./UniswapV2Router02";
import { UsdcContract } from "./Usdc";
import { WarpControlContract } from "./WarpControl";
import { WarpControlIContract } from "./WarpControlI";
import { WarpVaultLpContract } from "./WarpVaultLp";
import { WarpVaultLpFactoryContract } from "./WarpVaultLpFactory";
import { WarpVaultLpFactoryIContract } from "./WarpVaultLpFactoryI";
import { WarpVaultLpiContract } from "./WarpVaultLpi";
import { WarpVaultScContract } from "./WarpVaultSc";
import { WarpVaultScFactoryContract } from "./WarpVaultScFactory";
import { WarpVaultScFactoryIContract } from "./WarpVaultScFactoryI";
import { WarpVaultSciContract } from "./WarpVaultSci";
import { WarpWrapperTokenContract } from "./WarpWrapperToken";
import { WrappedBitcoinContract } from "./WrappedBitcoin";
import { WrappedEthereumContract } from "./WrappedEthereum";

declare global {
  namespace Truffle {
    interface Artifacts {
      require(name: "BaseJumpRateModelV2"): BaseJumpRateModelV2Contract;
      require(name: "DAI"): DaiContract;
      require(name: "ERC20"): Erc20Contract;
      require(name: "ExtendedIERC20"): ExtendedIerc20Contract;
      require(name: "IERC20"): Ierc20Contract;
      require(name: "InterestRateModel"): InterestRateModelContract;
      require(name: "IUniswapV2Factory"): IUniswapV2FactoryContract;
      require(name: "IUniswapV2Pair"): IUniswapV2PairContract;
      require(name: "IUniswapV2Router01"): IUniswapV2Router01Contract;
      require(name: "IUniswapV2Router02"): IUniswapV2Router02Contract;
      require(name: "IWETH"): IwethContract;
      require(name: "JumpRateModelV2"): JumpRateModelV2Contract;
      require(name: "Migrations"): MigrationsContract;
      require(name: "Ownable"): OwnableContract;
      require(name: "TesterToken"): TesterTokenContract;
      require(name: "TetherToken"): TetherTokenContract;
      require(name: "UniswapLPOracleFactory"): UniswapLpOracleFactoryContract;
      require(name: "UniswapLPOracleFactoryI"): UniswapLpOracleFactoryIContract;
      require(name: "UniswapLPOracleInstance"): UniswapLpOracleInstanceContract;
      require(name: "UniswapV2Factory"): UniswapV2FactoryContract;
      require(name: "UniswapV2Pair"): UniswapV2PairContract;
      require(name: "UniswapV2Router02"): UniswapV2Router02Contract;
      require(name: "USDC"): UsdcContract;
      require(name: "WarpControl"): WarpControlContract;
      require(name: "WarpControlI"): WarpControlIContract;
      require(name: "WarpVaultLP"): WarpVaultLpContract;
      require(name: "WarpVaultLPFactory"): WarpVaultLpFactoryContract;
      require(name: "WarpVaultLPFactoryI"): WarpVaultLpFactoryIContract;
      require(name: "WarpVaultLPI"): WarpVaultLpiContract;
      require(name: "WarpVaultSC"): WarpVaultScContract;
      require(name: "WarpVaultSCFactory"): WarpVaultScFactoryContract;
      require(name: "WarpVaultSCFactoryI"): WarpVaultScFactoryIContract;
      require(name: "WarpVaultSCI"): WarpVaultSciContract;
      require(name: "WarpWrapperToken"): WarpWrapperTokenContract;
      require(name: "WrappedBitcoin"): WrappedBitcoinContract;
      require(name: "WrappedEthereum"): WrappedEthereumContract;
    }
  }
}

export {
  BaseJumpRateModelV2Contract,
  BaseJumpRateModelV2Instance
} from "./BaseJumpRateModelV2";
export { DaiContract, DaiInstance } from "./Dai";
export { Erc20Contract, Erc20Instance } from "./Erc20";
export {
  ExtendedIerc20Contract,
  ExtendedIerc20Instance
} from "./ExtendedIerc20";
export { Ierc20Contract, Ierc20Instance } from "./Ierc20";
export {
  InterestRateModelContract,
  InterestRateModelInstance
} from "./InterestRateModel";
export {
  IUniswapV2FactoryContract,
  IUniswapV2FactoryInstance
} from "./IUniswapV2Factory";
export {
  IUniswapV2PairContract,
  IUniswapV2PairInstance
} from "./IUniswapV2Pair";
export {
  IUniswapV2Router01Contract,
  IUniswapV2Router01Instance
} from "./IUniswapV2Router01";
export {
  IUniswapV2Router02Contract,
  IUniswapV2Router02Instance
} from "./IUniswapV2Router02";
export { IwethContract, IwethInstance } from "./Iweth";
export {
  JumpRateModelV2Contract,
  JumpRateModelV2Instance
} from "./JumpRateModelV2";
export { MigrationsContract, MigrationsInstance } from "./Migrations";
export { OwnableContract, OwnableInstance } from "./Ownable";
export { TesterTokenContract, TesterTokenInstance } from "./TesterToken";
export { TetherTokenContract, TetherTokenInstance } from "./TetherToken";
export {
  UniswapLpOracleFactoryContract,
  UniswapLpOracleFactoryInstance
} from "./UniswapLpOracleFactory";
export {
  UniswapLpOracleFactoryIContract,
  UniswapLpOracleFactoryIInstance
} from "./UniswapLpOracleFactoryI";
export {
  UniswapLpOracleInstanceContract,
  UniswapLpOracleInstanceInstance
} from "./UniswapLpOracleInstance";
export {
  UniswapV2FactoryContract,
  UniswapV2FactoryInstance
} from "./UniswapV2Factory";
export { UniswapV2PairContract, UniswapV2PairInstance } from "./UniswapV2Pair";
export {
  UniswapV2Router02Contract,
  UniswapV2Router02Instance
} from "./UniswapV2Router02";
export { UsdcContract, UsdcInstance } from "./Usdc";
export { WarpControlContract, WarpControlInstance } from "./WarpControl";
export { WarpControlIContract, WarpControlIInstance } from "./WarpControlI";
export { WarpVaultLpContract, WarpVaultLpInstance } from "./WarpVaultLp";
export {
  WarpVaultLpFactoryContract,
  WarpVaultLpFactoryInstance
} from "./WarpVaultLpFactory";
export {
  WarpVaultLpFactoryIContract,
  WarpVaultLpFactoryIInstance
} from "./WarpVaultLpFactoryI";
export { WarpVaultLpiContract, WarpVaultLpiInstance } from "./WarpVaultLpi";
export { WarpVaultScContract, WarpVaultScInstance } from "./WarpVaultSc";
export {
  WarpVaultScFactoryContract,
  WarpVaultScFactoryInstance
} from "./WarpVaultScFactory";
export {
  WarpVaultScFactoryIContract,
  WarpVaultScFactoryIInstance
} from "./WarpVaultScFactoryI";
export { WarpVaultSciContract, WarpVaultSciInstance } from "./WarpVaultSci";
export {
  WarpWrapperTokenContract,
  WarpWrapperTokenInstance
} from "./WarpWrapperToken";
export {
  WrappedBitcoinContract,
  WrappedBitcoinInstance
} from "./WrappedBitcoin";
export {
  WrappedEthereumContract,
  WrappedEthereumInstance
} from "./WrappedEthereum";
