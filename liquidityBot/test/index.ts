import { expect } from "chai";
import { ethers } from "hardhat";

describe("Test Paths", () => {
  require("./Greeter.test")
})

describe("LiquidityController", function () {
  // Set up liquidity pool

  beforeEach(function () {
    // Create new contract
  })


  it("Should not be callable by anyone other than owner", async function () {
    // Call all public functions from different acount
  })

  it("Should return a position on initialization", async function () {

  })

  it("Should return a position on resetBounds", async function () {

  })

  it("Should return the money on retrieve liquidity", async function () {

  })

  it("Should inherit ISwapRouter and restrict access to owner", async function () {
    // TODO: test exactInputSingle
    // TODO: test exactInput
    // TODO: test exactOutputSingle
    // TODO: test exactOutput
  })
})
