
const { getNamedAccounts } = require("hardhat");
module.exports = async ({getNamedAccounts, deployments}) => {
  const {deploy,log} = deployments;
  const {firstAccount} = await getNamedAccounts();

  log("Deploying the NFTPoolLockAndRelease contract")


    //address _router, address _link,address _nft

  const ccipLocalSimulatorDeloyment = await deployments.get("CCIPLocalSimulator");
  const ccipLocalSimulator = await ethers.getContractAt("CCIPLocalSimulator", ccipLocalSimulatorDeloyment.address);
  const config = await ccipLocalSimulator.configuration();
  const sourceRouter = config.sourceRouter_;
  const linkToken = config.linkToken_;
  const nftDeployment = await deployments.get("MyToken");
  const nftAddress = nftDeployment.address;



    //  * @return chainSelector_ - The unique CCIP Chain Selector.
    //  * @return sourceRouter_  - The source chain Router contract.
    //  * @return destinationRouter_ - The destination chain Router contract.
    //  * @return wrappedNative_ - The wrapped native token which can be used for CCIP fees.
    //  * @return linkToken_ - The LINK token.
    //  * @return ccipBnM_ - The ccipBnM token.
    //  * @return ccipLnM_ - The ccipLnM token.

  await deploy('NFTPoolLockAndRelease', {
    from: firstAccount,
    args: [sourceRouter,linkToken,nftAddress],
    log: true,
  });

  log("NFTPoolLockAndRelease is deployed!")

};
module.exports.tags = ["all","NFTPoolLockAndRelease"];
module.exports.dependencies = ["CCIPLocalSimulator"]; // this ensure the Token script above is executed first, so `deployments.get('Token')` succeeds
