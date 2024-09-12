// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
contract HardhatTextContract  {
    uint256 price = 2500;
    function emitLatestPrice() public view returns (uint256) {
        return price;
    }
}