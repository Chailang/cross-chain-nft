const { getNamedAccounts } = require("hardhat");
const {developmentChains,networkConfig} = require("../helper-hardhat-config");

module.exports = async ({getNamedAccounts, deployments}) => {
  const {deploy,log} = deployments;
  const {firstAccount} = await getNamedAccounts();

  log("Deploying the NFTPoolBurnAndMint contract")

    //address _router, address _link,address _nft
  const wnftDeployment = await deployments.get("WrappedMyToken");
  const wnftAddress = wnftDeployment.address;
  let destinationRouter;
  let linkToken;
  if (!developmentChains.includes(network.name)) { //测试网
    destinationRouter = networkConfig[network.config.chainId].router;
    linkToken = networkConfig[network.config.chainId].linkToken;
  }else{ //本地
    const ccipLocalSimulatorDeloyment = await deployments.get("CCIPLocalSimulator");
    const ccipLocalSimulator = await ethers.getContractAt("CCIPLocalSimulator", ccipLocalSimulatorDeloyment.address);
    const config = await ccipLocalSimulator.configuration();
    destinationRouter = config.destinationRouter_;
    linkToken = config.linkToken_;
  }




  await deploy('NFTPoolBurnAndMint', {
    from: firstAccount,
    args: [destinationRouter,linkToken,wnftAddress],
    log: true,
  });

  log("NFTPoolBurnAndMint is deployed!")

};
module.exports.tags = ["all","destinationchain"];
// module.exports.dependencies = ["CCIPLocalSimulator"]; // this ensure the Token script above is executed first, so `deployments.get('Token')` succeeds
