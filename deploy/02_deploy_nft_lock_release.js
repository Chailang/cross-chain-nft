
const { getNamedAccounts } = require("hardhat");
const {developmentChains,networkConfig} = require("../helper-hardhat-config");

module.exports = async ({getNamedAccounts, deployments}) => {
  const {deploy,log} = deployments;
  const {firstAccount} = await getNamedAccounts();

  log("Deploying the NFTPoolLockAndRelease contract")


    //address _router, address _link,address _nft
  const nftDeployment = await deployments.get("MyToken");
  const nftAddress = nftDeployment.address;
 
 
  let sourceRouter;
  let linkToken;
  log("network.name =",network.name);
  log("network.config.chainId =",network.config.chainId);
  if (!developmentChains.includes(network.name)) { //测试网
    sourceRouter = networkConfig[network.config.chainId].router;
    linkToken = networkConfig[network.config.chainId].linkToken;

  }else{ //本地
    const ccipLocalSimulatorDeloyment = await deployments.get("CCIPLocalSimulator");
    const ccipLocalSimulator = await ethers.getContractAt("CCIPLocalSimulator", ccipLocalSimulatorDeloyment.address);
    const config = await ccipLocalSimulator.configuration();
    sourceRouter = config.sourceRouter_;
    linkToken = config.linkToken_;
  }


  await deploy('NFTPoolLockAndRelease', {
    from: firstAccount,
    args: [sourceRouter,linkToken,nftAddress],
    log: true,
  });

  log("NFTPoolLockAndRelease is deployed!")

};
module.exports.tags = ["all","sourcechain"];
// module.exports.dependencies = ["CCIPLocalSimulator"]; // this ensure the Token script above is executed first, so `deployments.get('Token')` succeeds
