import { ethers } from "ethers";
import { Pool } from "@uniswap/v3-sdk";
import { Token } from "@uniswap/sdk-core";
import { abi as IUniswapV3PoolABI } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import addresses from "../../addresses.config";
import { alchemyProvider } from "../util";


export const getPool = (poolAddress:string) => {
    return new ethers.Contract(
        poolAddress,
        IUniswapV3PoolABI,
        alchemyProvider
    );
}