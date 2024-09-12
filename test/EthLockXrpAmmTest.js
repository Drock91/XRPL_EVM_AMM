const { expect } = require("chai");
const { ethers } = require("hardhat");
describe("MockAggregatorV3Interface Deployment", function () {
  let mockPriceFeed;
  let deployer;
  beforeEach(async function () {
    const [deployers] = await ethers.getSigners();
    deployer = deployers;
    const PriceFeed = await ethers.getContractFactory("HardhatTextContract", deployer);
    const priceFeed = await PriceFeed.deploy();
    let price = 0;
    if(priceFeed.emitLatestPrice() !== undefined && priceFeed.emitLatestPrice() !== null){
      mockPriceFeed = await priceFeed.emitLatestPrice();
    }
  });
  it("Should deploy the MockAggregatorV3Interface", async function () {
    console.log("Tested Address:", deployer.address); // Additional log to confirm address during test
    console.log(`Chainlink ETH/USD: $: ${mockPriceFeed.toString()}`);
  });
});
/*
describe("EthLockXrpAmmTest", function () {
  let mockPriceFeed;
  let ethLockXrpAmm;
  let owner;

  beforeEach(async function () {
    console.log("Starting local deployment...");

    try {
      // Deploy the mock price feed on Hardhat's local network
      const MockPriceFeed = await ethers.getContractFactory("MockAggregatorV3Interface");
      mockPriceFeed = await MockPriceFeed.deploy();
      await mockPriceFeed.deployed(); // Wait for deployment to complete
      console.log("Mock Price Feed Address:", mockPriceFeed.address);
    } catch (error) {
      console.error("Failed to deploy MockPriceFeed:", error.message);
      throw error; // Stop the test if deployment fails
    }

    try {
      // Deploy EthLockXrpAmm and pass in the mock price feed address
      const EthLockXrpAmm = await ethers.getContractFactory("EthLockXrpAmm");
      ethLockXrpAmm = await EthLockXrpAmm.deploy(mockPriceFeed.address);
      await ethLockXrpAmm.deployed(); // Wait for deployment to complete
      console.log("EthLockXrpAmm Address:", ethLockXrpAmm.address);
    } catch (error) {
      console.error("Failed to deploy EthLockXrpAmm:", error.message);
      throw error;
    }

    [owner] = await ethers.getSigners(); // Retrieve the test accounts
  });

  it("Should emit the latest price correctly", async function () {
    const txResponse = await ethLockXrpAmm.emitLatestPrice();
    const txReceipt = await txResponse.wait();
    const priceEvent = txReceipt.events?.filter(x => x.event === "DebugInfo")[0];
    expect(priceEvent).to.not.be.undefined;
    console.log("Logged Price from Event:", priceEvent.args.price.toString());
  });
});
*/