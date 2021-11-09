//SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

contract Ownable { 
    address payable public immutable owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyBy(address _account) {
        require(msg.sender == _account);
        _;
    }
}