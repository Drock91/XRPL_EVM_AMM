// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "../test/MockAggregatorV3Interface.sol";

//import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract EthLockXrpAmm {
    address public owner;
    AggregatorV3Interface public priceFeed;

    mapping(address => uint256) public balances;
    event Locked(address indexed sender, uint256 amount, uint256 usdValue);
    event Unlocked(address indexed receiver, uint256 amount);
    event DebugInfo(uint256 price);
    constructor(address _priceFeedAddress) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(_priceFeedAddress);
    }

    function getLatestPrice() public view returns (uint256) {
        (
            ,
            int256 price,
           ,
           ,
           
        ) = priceFeed.latestRoundData();
        require(price > 0, "Invalid price data");
        return uint256(price);
    }
    function emitLatestPrice() public returns (uint256) {
        uint256 price = getLatestPrice();
        emit DebugInfo(price);
        return price;
    }
    function lockEther() public payable {
        uint256 usdValue = (msg.value * getLatestPrice()) / 1e18; // Adjust depending on the oracle's returned decimals
        balances[msg.sender] += msg.value;
        emit Locked(msg.sender, msg.value, usdValue);
    }

    function unlockEther(address payable receiver, uint256 amount) public {
        require(msg.sender == owner, "Only owner can unlock ether");
        require(balances[receiver] >= amount, "Insufficient balance to unlock");
        balances[receiver] -= amount;
        receiver.transfer(amount);
        emit Unlocked(receiver, amount);
    }
}