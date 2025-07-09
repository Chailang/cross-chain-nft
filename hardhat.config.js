require("@nomicfoundation/hardhat-toolbox");
require('hardhat-deploy');

const {ccipTag,sourceChainTag, destChainTag, developmentChains} =  require( "./helper-hardhat-config");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  namedAccounts: {
    firstAccount: {
      default: 0, // here this will by default take the first account as firstAccount
    },
    secondAccount: {
      default: 1, // here this will by default take the second account as secondAccount
    },
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },
};
