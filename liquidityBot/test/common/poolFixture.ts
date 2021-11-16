import { Fixture } from "@ethereum-waffle/provider";
import { Wallet } from "@ethersproject/wallet";
import { BigNumber, Contract } from "ethers";
import { ethers } from "hardhat";
import addresses from "../../addresses.config";
import { IUniswapV3Pool } from "../../typechain";
import { abi as IUniswapV3PoolABI } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { Pool } from "@uniswap/v3-sdk";
import { Token } from "@uniswap/sdk-core";

/**
 * A simple fixture for getting a USDC_ETH pool and it's tokens
 */
const poolFixture: Fixture<{pool:Pool, token0:Token,token1:Token}> = async (wallets, provider) => {
    const poolContract = new ethers.Contract(
        addresses.uniswapPools.USDC_ETH,
        IUniswapV3PoolABI,
        provider
    ) as IUniswapV3Pool
    const [immutables, state] = await Promise.all([
        getPoolImmutables(poolContract),
        getPoolState(poolContract),
    ]);

    const token0 = new Token(3, immutables.token0, 6, "USDC", "USD Coin");
    const token1 = new Token(3, immutables.token1, 18, "ETH", "Ether");

    const pool = new Pool(
        token0,
        token1,
        immutables.fee,
        state.sqrtPriceX96.toString(),
        state.liquidity.toString(),
        state.tick
    );
    return {
        pool,
        token0: token0,
        token1: token1
    }
}

interface Immutables {
  factory: string;
  token0: string;
  token1: string;
  fee: number;
  tickSpacing: number;
  maxLiquidityPerTick: BigNumber;
}

interface State {
  liquidity: BigNumber;
  sqrtPriceX96: BigNumber;
  tick: number;
  observationIndex: number;
  observationCardinality: number;
  observationCardinalityNext: number;
  feeProtocol: number;
  unlocked: boolean;
}

async function getPoolImmutables(poolContract:IUniswapV3Pool) {
  const [factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick] =
    await Promise.all([
      poolContract.factory(),
      poolContract.token0(),
      poolContract.token1(),
      poolContract.fee(),
      poolContract.tickSpacing(),
      poolContract.maxLiquidityPerTick(),
    ]);

  const immutables: Immutables = {
    factory,
    token0,
    token1,
    fee,
    tickSpacing,
    maxLiquidityPerTick,
  };
  return immutables;
}

async function getPoolState(poolContract:IUniswapV3Pool) {
  const [liquidity, slot] = await Promise.all([
    poolContract.liquidity(),
    poolContract.slot0(),
  ]);

  const PoolState: State = {
    liquidity,
    sqrtPriceX96: slot[0],
    tick: slot[1],
    observationIndex: slot[2],
    observationCardinality: slot[3],
    observationCardinalityNext: slot[4],
    feeProtocol: slot[5],
    unlocked: slot[6],
  };

  return PoolState;
}

export default poolFixture;