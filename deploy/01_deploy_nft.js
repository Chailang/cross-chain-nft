const {sourceChainTag, destChainTag, developmentChains} =  require( "../helper-hardhat-config");

module.exports = async ({getNamedAccounts, deployments}) => {
  const {deploy,log} = deployments;
  const {firstAccount} = await getNamedAccounts();

  log("Deploying the nft contract")
  await deploy('MyToken', {
    from: firstAccount,
    args: ['MyToken',"MNT"],
    log: true,
  });

  log("MyToken is deployed!")

};
module.exports.tags = ["MyToken","all"];
