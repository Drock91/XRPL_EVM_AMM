async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const MockPriceFeed = await ethers.getContractFactory("MockAggregatorV3Interface");

  try {
    const mockPriceFeed = await MockPriceFeed.deploy(); 
    console.log("Mock Price Feed deployed to:", mockPriceFeed.address);
  } catch (error) {
    console.error("Error during deployment:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
