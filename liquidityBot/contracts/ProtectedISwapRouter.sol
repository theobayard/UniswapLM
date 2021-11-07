//SPDX-License-Identifier: MIT

import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';
/**
 This class serves to minimize the attack surface of the contract by restricting access
 to ISwapRouter's functions to the owner. No one else needs to use it, so
 there is no reason to let them.
 */
contract ProtectedISwapRouter is ISwapRouter, Ownable {

}