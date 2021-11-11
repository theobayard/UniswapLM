import { expect } from "chai";
import { ethers, waffle } from "hardhat";
import addresses from "../addresses.config"
import { MyPositionHolder__factory } from "../typechain/factories/MyPositionHolder__factory";
import { INonfungiblePositionManager, ISwapRouter, IUniswapV3Factory, IWETH9, MyPositionHolder } from "../typechain";
import { Wallet } from "ethers";
import uniswapFixture from "./common/uniswapFixture";
import { TestERC20 } from "../typechain/TestERC20";
import { getMinTick, getMaxTick } from "@uniswap/v3-periphery-tests/test/shared/ticks"
import { FeeAmount, TICK_SPACINGS } from '@uniswap/v3-periphery-tests/test/shared/constants'

describe("MyPositionHolder", async function () {
  let positionHolder:MyPositionHolder;
  let MyPositionHolder:MyPositionHolder__factory;
  let wallets: Wallet[];
  let wallet:Wallet, other:Wallet;
  let loadFixture: ReturnType<typeof waffle.createFixtureLoader>

  before("create factory", async ()=>{
    MyPositionHolder = 
      await ethers.getContractFactory("MyPositionHolder") as MyPositionHolder__factory;
    wallets = await (ethers as any).getSigners();
    [wallet, other] = wallets;
    loadFixture = waffle.createFixtureLoader(wallets);
  })

  let factory: IUniswapV3Factory
  let nft: INonfungiblePositionManager
  let tokens: [TestERC20, TestERC20, TestERC20]
  let weth9: IWETH9
  let router: ISwapRouter

  beforeEach(async ()=>{
    positionHolder = await MyPositionHolder.deploy(addresses.uniswap.nonfungiblePositionManager);
    await positionHolder.deployed();
    ({ nft, factory, tokens, weth9, router } = await loadFixture(uniswapFixture))
  })

  it("Should be able to receive a position", async function () {
    await nft.mint({
      token0: tokens[0].address,
      token1: tokens[1].address,
      tickLower: getMinTick(TICK_SPACINGS[FeeAmount.MEDIUM]),
      tickUpper: getMaxTick(TICK_SPACINGS[FeeAmount.MEDIUM]),
      fee: FeeAmount.MEDIUM,
      recipient: positionHolder.address,
      amount0Desired: 15,
      amount1Desired: 15,
      amount0Min: 0,
      amount1Min: 0,
      deadline: 10,
    })
  })

  it("Should fail when given a second position", async function () {
    await nft.mint({
      token0: tokens[0].address,
      token1: tokens[1].address,
      tickLower: getMinTick(TICK_SPACINGS[FeeAmount.MEDIUM]),
      tickUpper: getMaxTick(TICK_SPACINGS[FeeAmount.MEDIUM]),
      fee: FeeAmount.MEDIUM,
      recipient: positionHolder.address,
      amount0Desired: 15,
      amount1Desired: 15,
      amount0Min: 0,
      amount1Min: 0,
      deadline: 10,
    })
    expect(await nft.mint({
      token0: tokens[0].address,
      token1: tokens[1].address,
      tickLower: getMinTick(TICK_SPACINGS[FeeAmount.MEDIUM]),
      tickUpper: getMaxTick(TICK_SPACINGS[FeeAmount.MEDIUM]),
      fee: FeeAmount.MEDIUM,
      recipient: positionHolder.address,
      amount0Desired: 15,
      amount1Desired: 15,
      amount0Min: 0,
      amount1Min: 0,
      deadline: 10,
    })).to.be.revertedWith("This contract already has an NFT")
  })
})