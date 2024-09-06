require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config(); // For loading environment variables from .env

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
},
  networks: {
    hardhat: {
      // Local Hardhat network for testing
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_PROJECT_ID}`, // Replace with your Infura project ID
      accounts: [process.env.PRIVATE_KEY] // Your wallet's private key (store securely in .env)
    }
  }
};
