//SPDX-License-Identifier: MIT

contract Ownable { 
    address payable public constant owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyBy(address _account) {
        require(msg.sender == _acount);
        _;
    }
}