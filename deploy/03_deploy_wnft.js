
const { getNamedAccounts } = require("hardhat");

module.exports = async ({getNamedAccounts, deployments}) => {
  const {deploy,log} = deployments;
  const {firstAccount} = await getNamedAccounts();

  log("Deploying the WrappedMyToken contract")
  await deploy('WrappedMyToken', {
    from: firstAccount,
    args: ['WrappedMyToken',"WMT"],
    log: true,
  });

  log("WrappedMyToken is deployed!")

};
module.exports.tags = ["all","destinationchain"];