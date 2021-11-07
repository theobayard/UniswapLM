//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "hardhat/console.sol";
import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';
import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';
import 'contracts/Ownable.sol';

contract LiquidityController is Ownable, ISwapRouter {

    /**
     Set the owner, same position info and create an initial position
     */ 
    constructor() {
        super;

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

        changeBounds(lowerBound, upperBound);

        return createPosition();
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
    
    // Ideally this create a position in the owner's account
    function createPosition() private {
        // TODO: impliment this
    }

    function changeBounds(uint lowerBound, uint upperBound) private {
        // TODO: impliment this
    }
}