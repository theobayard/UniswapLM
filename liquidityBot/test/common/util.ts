import { ethers } from "hardhat";
import { INonfungiblePositionManager } from "../../typechain";
import { Pool, Position } from "@uniswap/v3-sdk";
import { Percent, Token } from "@uniswap/sdk-core";
import { Contract } from "@ethersproject/contracts";
import { Signer } from "@ethersproject/abstract-signer";

export const getCurrentBlock = async () => {
    const blockNum = await ethers.provider.getBlockNumber();
    return await ethers.provider.getBlock(blockNum);
}

export const mintPosition = async (pool:Pool,
                                   position:Position,
                                   nfpManager:INonfungiblePositionManager,
                                   recipient:Contract,
                                   spender:Signer,
                                   slippageTolerance:Percent,
                                   timeSlippageSeconds:number) => {

    // Approve nfpManager
    approveTokenTransfer(
        pool.token0,
        spender,
        nfpManager,
        Number(position.mintAmounts.amount0.toString())
    )
    approveTokenTransfer(
        pool.token1,
        spender,
        nfpManager,
        Number(position.mintAmounts.amount1.toString())
    )

    const slipAmounts = position.mintAmountsWithSlippage(slippageTolerance);
    const block = await getCurrentBlock();
    return await nfpManager.connect(spender).mint({
        token0:pool.token0.address,
        token1:pool.token1.address,
        fee:pool.fee,
        tickLower:position.tickLower,
        tickUpper:position.tickUpper,
        amount0Desired:position.mintAmounts.amount0.toString(),
        amount1Desired:position.mintAmounts.amount1.toString(),
        amount0Min:slipAmounts.amount0.toString(),
        amount1Min:slipAmounts.amount0.toString(),
        recipient: recipient.address,
        deadline:block.timestamp + timeSlippageSeconds,
    })
}


let approvalAbi = ["function approve(address _spender, uint256 _value) public returns (bool success)"]
export const approveTokenTransfer = async (token:Token, from:Signer, to:Contract, amount:number) => {
    let contract = new ethers.Contract(token.address, approvalAbi,from)
    await contract.approve(to.address, amount)
}