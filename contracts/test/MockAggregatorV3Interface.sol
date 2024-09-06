// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface AggregatorV3Interface {
    function decimals() external view returns (uint8);
    function description() external view returns (string memory);
    function version() external view returns (uint256);
    function getRoundData(uint80 _roundId) external view returns (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    );
    function latestRoundData() external view returns (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    );
}

contract MockAggregatorV3Interface is AggregatorV3Interface {
    int256 private price = 2000 * 10**8; // Set an initial price for testing
    uint8 private constant _decimals = 8; // Example decimal value for price feeds
    string private constant _description = "Mock Aggregator";
    uint256 private constant _version = 1;

    constructor() {
        // Constructor can remain empty if there's no additional initialization required
    }

    // Implementing the decimals function from the interface
    function decimals() external pure override returns (uint8) {
        return _decimals;
    }

    // Implementing the description function from the interface
    function description() external pure override returns (string memory) {
        return _description;
    }

    // Implementing the version function from the interface
    function version() external pure override returns (uint256) {
        return _version;
    }

    // Implementing the getRoundData function from the interface
    function getRoundData(uint80 _roundId) external view override returns (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    ) {
        return (_roundId, price, block.timestamp, block.timestamp, _roundId);
    }

    // Implementing the latestRoundData function from the interface
    function latestRoundData() external view override returns (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    ) {
        return (0, price, block.timestamp, block.timestamp, 0);
    }

    // Function to change the price for testing purposes
    function setPrice(int256 newPrice) public {
        price = newPrice;
    }
}