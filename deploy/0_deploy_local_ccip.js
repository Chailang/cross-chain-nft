const { getNamedAccounts } = require("hardhat");
const {developmentChains} = require("../helper-hardhat-config");
module.exports = async ({getNamedAccounts, deployments}) => {
    
  if (!developmentChains.includes(network.name)) {
    log("Local CCIP Simulator is only for development chains, skipping deployment.");
    return;
  }
  const {deploy,log} = deployments;
  const {firstAccount} = await getNamedAccounts(); 
  log("Deploying the CCIPLocalSimulator contract")
  await deploy('CCIPLocalSimulator', {
    from: firstAccount,
    args: [], //无入参
    log: true,
  });

  log("CCIPLocalSimulator is deployed!")

};
module.exports.tags = ["CCIPLocalSimulator","all"];