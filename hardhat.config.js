require("@nomicfoundation/hardhat-toolbox");
require('hardhat-deploy');
require('hardhat-deploy-ethers');
require("@chainlink/env-enc").config();
PRIVATE_KEY = process.env.PRIVATE_KEY;
SEPOLIA_URL = process.env.SEPOLIA_URL;
ALCHEMY_URL = process.env.ALCHEMY_URL;


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
  networks: {
    // hardhat: {
    //   chainId: 1337,
    //   ccip: {
    //     enabled: true,
    //     localSimulator: true, // 启用本地CCIP模拟器
    //   },
    // },
    // localhost: {
    //   chainId: 1337,
    //   ccip: {
    //     enabled: true,
    //     localSimulator: true, // 启用本地CCIP模拟器
    //   },
    // },
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations: 6,
      companionNetworks: {
        destChain: "amoy"
      }
    },
    amoy: {
      url: ALCHEMY_URL,
      accounts: [PRIVATE_KEY],
      chainId: 80002,
      blockConfirmations: 6,
      companionNetworks: {
        destChain: "sepolia"
      }
    }
  },
};
