//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
pragma abicoder v2;

import "hardhat/console.sol";

import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';
import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';
import '@uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol';
import '@uniswap/v3-periphery/contracts/libraries/OracleLibrary.sol';

import 'contracts/Ownable.sol';
import 'contracts/MyPositionHolder.sol';

contract LiquidityController is Ownable, MyPositionHolder {
    ISwapRouter public immutable swapRouter;
    address     public immutable token0;
    address     public immutable token1;
    uint24      public immutable fee;

    /**
        Take in uniswap v3 contract info
     */ 
    constructor(ISwapRouter _swapRouter,
                INonfungiblePositionManager _nftManager,
                address _token0,
                address _token1,
                uint24  _fee)
            MyPositionHolder(_nftManager)
            Ownable() {

        swapRouter = _swapRouter;
        token0     = _token0;
        token1     = _token1;
        fee        = _fee;

        // TODO: Make initial position
    }

    /**
     Remove the old position and create a new one
     */
    function resetPosition(uint lowerBound, uint upperBound)
        public
        onlyBy(owner) {
        // TODO: impliment this

        removeCurrentPosition();

        addEarningsToLiquidity();

        return createPosition(lowerBound, upperBound);
    }

    // Returns all liquidity to owner
    function retrieveLiquidity()
        public
        onlyBy(owner) {
        
    }

    function removeCurrentPosition() private {
        // TODO: impliment this
    }

    function addEarningsToLiquidity() private {
        // TODO: impliment this
    }
    
    // Makes a new position
    function createPosition(lowerBound, upperBound) private {
        // TODO: impliment this

        // transfer tokens to contract
        TransferHelper.safeTransferFrom(DAI, msg.sender, address(this), amount0ToMint);
        TransferHelper.safeTransferFrom(USDC, msg.sender, address(this), amount1ToMint);

        // Approve the position manager
        TransferHelper.safeApprove(DAI, address(nonfungiblePositionManager), amount0ToMint);
        TransferHelper.safeApprove(USDC, address(nonfungiblePositionManager), amount1ToMint);

        INonfungiblePositionManager.MintParams memory params =
            INonfungiblePositionManager.MintParams({
                token0: DAI,
                token1: USDC,
                fee: poolFee,
                tickLower: TickMath.MIN_TICK,
                tickUpper: TickMath.MAX_TICK,
                amount0Desired: amount0ToMint,
                amount1Desired: amount1ToMint,
                amount0Min: 0,
                amount1Min: 0,
                recipient: address(this),
                deadline: block.timestamp
            });

        // Note that the pool defined by DAI/USDC and fee tier 0.3% must already be created and initialized in order to mint
        (tokenId, liquidity, amount0, amount1) = nonfungiblePositionManager.mint(params);
    }

    function getCurrentRatio() {
        
    }
}