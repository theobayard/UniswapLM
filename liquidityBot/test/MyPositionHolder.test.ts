// import { expect } from "chai";
// import { ethers, waffle } from "hardhat";
// import addresses from "../addresses.config"
// import { MyPositionHolder__factory } from "../typechain/factories/MyPositionHolder__factory";
// import { INonfungiblePositionManager, MyPositionHolder } from "../typechain";
// import { Wallet } from "ethers";
// import positionFixture from "./common/positionFixture"
// import { Pool, Position, NonfungiblePositionManager } from "@uniswap/v3-sdk";
// import { Token, Percent } from "@uniswap/sdk-core";
// import { getCurrentBlock, mintPosition } from "./common/util";

// describe("MyPositionHolder", async function () {
//   let positionHolder:MyPositionHolder;
//   let MyPositionHolder:MyPositionHolder__factory;
//   let wallets: Wallet[];
//   let wallet:Wallet, other:Wallet;
//   let loadFixture: ReturnType<typeof waffle.createFixtureLoader>

//   before("create factory", async ()=>{
//     MyPositionHolder = 
//       await ethers.getContractFactory("MyPositionHolder") as MyPositionHolder__factory;
//     wallets = await (ethers as any).getSigners();
//     [wallet, other] = wallets;
//     loadFixture = waffle.createFixtureLoader(wallets);
//     ({pool,token0,token1,position, positionManager} = await loadFixture(positionFixture))
//   })

//   let pool:Pool;
//   let token0:Token, token1:Token;
//   let position:Position;
//   let positionManager:INonfungiblePositionManager;
  

//   beforeEach(async ()=>{
//     positionHolder = await MyPositionHolder.deploy(addresses.uniswap.nonfungiblePositionManager);
//     await positionHolder.deployed();
//   })

//   it("Should be able to receive a position", async function () {

    
//     await mintPosition(
//       pool,
//       position,
//       positionManager,
//       positionHolder,
//       wallet,
//       new Percent(50,10_000),
//       200
//     )

//     // Verify it got the transaction
//   })

//   it("Should fail when given a second position", async function () {
    
//   })
// })