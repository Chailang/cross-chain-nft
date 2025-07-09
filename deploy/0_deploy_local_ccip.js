const { getNamedAccounts } = require("hardhat");

module.exports = async ({getNamedAccounts, deployments}) => {
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