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
        uint256 tokenId;
        uint128 liquidity;
        address token0;
        address token1;
    }

    INonfungiblePositionManager internal immutable nonfungiblePositionManager;
    Position internal currentPosition;
    bool internal isEmpty = true;

    constructor(
        INonfungiblePositionManager _nonfungiblePositionManager
    ) {
        nonfungiblePositionManager = _nonfungiblePositionManager;
    }


    // Implementing `onERC721Received` so this contract can receive custody of erc721 tokens
    function onERC721Received(
        address,
        address,
        uint256 tokenId,
        bytes calldata
    ) external override returns (bytes4) {
        require(isEmpty, "This contract already has an NFT");
        // get position information

        _setPosition(tokenId);

        return this.onERC721Received.selector;
    }

    function _setPosition(uint256 _tokenId) internal {
        isEmpty = false;

        // Avoid stack depth problems by creating new enviroment
        currentPosition.tokenId = _tokenId;
        {
            (, , currentPosition.token0, currentPosition.token1, , , , currentPosition.liquidity, , , , ) =
                nonfungiblePositionManager.positions(currentPosition.tokenId);
        }

    }

    /**
     * Adds fees from position to contract
     */
    function _meltPosition() internal returns (uint256 amount0, uint256 amount1) {
        // Caller must own the ERC721 position, meaning it must be a deposit

        // set amount0Max and amount1Max to uint256.max to collect all fees
        // alternatively can set recipient to msg.sender and avoid another transaction in `sendToOwner`
        INonfungiblePositionManager.CollectParams memory params =
            INonfungiblePositionManager.CollectParams({
                tokenId: currentPosition.tokenId,
                recipient: address(this),
                amount0Max: type(uint128).max,
                amount1Max: type(uint128).max
            });

        (amount0, amount1) = nonfungiblePositionManager.collect(params);

        isEmpty = true;
    }
}