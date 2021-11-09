//SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
pragma abicoder v2;

import "hardhat/console.sol";

import '@uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol';

/**
 * This implements ERC721 to hold one Position at a time
 */
contract MyPositionHolder is IERC721Receiver {
    //// For enabling reception of NFTs
    struct Position {
        uint128 liquidity;
        address token0;
        address token1;
    }

    Position internal currentPosition;
    bool internal isEmpty = true;

    // Implementing `onERC721Received` so this contract can receive custody of erc721 tokens
    function onERC721Received(
        address operator,
        address,
        uint256 tokenId,
        bytes calldata
    ) external override returns (bytes4) {
        require(isEmpty, "This contract already has an NFT");
        // get position information

        _setPosition(tokenId);

        return this.onERC721Received.selector;
    }

    function _setPosition(uint256 tokenId) internal {

        (, , address token0, address token1, , , , uint128 liquidity, , , , ) =
            nonfungiblePositionManager.positions(tokenId);

        isEmpty = false;

        // set the data for position
        // operator is msg.sender
        currentPosition = Position({
            liquidity: liquidity, 
            token0: token0, 
            token1: token1
        });
    }
}