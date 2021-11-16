import { Pool, Position, nearestUsableTick } from "@uniswap/v3-sdk";
import { Token } from "@uniswap/sdk-core";
import { Fixture } from "@ethereum-waffle/provider";
import { ethers, waffle } from "hardhat";
import { loadFixture } from "ethereum-waffle";
import poolFixture from "./poolFixture";
import addresses from "../../addresses.config";
import { INonfungiblePositionManager } from "../../typechain";
import { abi as INonfungiblePositionManagerAbi } from "../../artifacts/@uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol/INonfungiblePositionManager.json";

/**
 * A fixture for creating a pool with a uniswap sdk position instance
 * that is ready to be deployed
 */
const positionFixture: Fixture<{
    pool:Pool, 
    token0:Token,
    token1:Token, 
    position:Position,
    positionManager:INonfungiblePositionManager
}> = async (wallets, provider) => {
    const loadFixture = waffle.createFixtureLoader(wallets,provider);
    const {pool,token0,token1} = await loadFixture(poolFixture);

    const position = new Position({
        pool: pool,
        liquidity: (await wallets[0].getBalance()).div(5).toString(),
        tickLower: nearestUsableTick(pool.tickCurrent, pool.tickSpacing) - pool.tickSpacing  * 2,
        tickUpper: nearestUsableTick(pool.tickCurrent, pool.tickSpacing) + pool.tickSpacing * 2
    })

    const positionManager = new ethers.Contract(
        addresses.uniswap.nonfungiblePositionManager,
        INonfungiblePositionManagerAbi
    ) as INonfungiblePositionManager

    return {
        pool,
        token0,
        token1,
        position,
        positionManager
    }
}

export default positionFixture