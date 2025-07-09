const { getNamedAccounts, deployments, ethers } = require("hardhat")
const { expect } = require("chai");
let firstAccount;
let ccipLocalSimulator;

let nft;
let wnft;
let nftPoolLockAndRelease;
let nftPoolBurnAndMint;
let chainSelector;

before(async function () {
  firstAccount = (await getNamedAccounts()).firstAccount;
  await deployments.fixture(["all"]);
    // 获取部署的合约实例
  const ccipLocalSimulatorDeployment = await deployments.get("CCIPLocalSimulator");
  ccipLocalSimulator = await ethers.getContractAt("CCIPLocalSimulator", ccipLocalSimulatorDeployment.address);
  const config = await ccipLocalSimulator.configuration();
  chainSelector = config.chainSelector_;

  const nftDeployment = await deployments.get("MyToken");
  nft = await ethers.getContractAt("MyToken", nftDeployment.address);

  const wnftDeployment = await deployments.get("WrappedMyToken");
  wnft = await ethers.getContractAt("WrappedMyToken", wnftDeployment.address);

  const nftPoolLockAndReleaseDeployment = await deployments.get("NFTPoolLockAndRelease"); 
  nftPoolLockAndRelease = await ethers.getContractAt("NFTPoolLockAndRelease", nftPoolLockAndReleaseDeployment.address);

  const nftPoolBurnAndMintDeployment = await deployments.get("NFTPoolBurnAndMint");
  nftPoolBurnAndMint = await ethers.getContractAt("NFTPoolBurnAndMint", nftPoolBurnAndMintDeployment.address);
}
);

describe("source -> destion", function () {
  
 
  it("test if the nft can be minted successfully", async function () {
     await nft.safeMint(firstAccount);
     const ownerOfNft = await nft.ownerOf(0);
     expect(ownerOfNft).to.equal(firstAccount);
  });

  it("test if the nft can be locked and transferred to destchaint", async function () {
     //给池子授权
     await nft.approve(nftPoolLockAndRelease.target, 0);
     //水龙头 求币
     await ccipLocalSimulator.requestLinkFromFaucet(nftPoolLockAndRelease, ethers.parseEther("10"));

     //发送NFT 去另一链， 锁仓
     await nftPoolLockAndRelease.newlockAndSendNFT(
        0,
        firstAccount,
        chainSelector,
        nftPoolBurnAndMint.target
    );
     //检查nft是否被锁仓
     const ownerOfNft = await nft.ownerOf(0);
     expect(ownerOfNft).to.equal(nftPoolLockAndRelease.target);


  });

  it("test if the wnft is owned by new owner in destChain", async function () {
     const ownerOfNft = await wnft.ownerOf(0);
     expect(ownerOfNft).to.equal(firstAccount);
  });

  
 
});

describe("destion -> source", function () {
  it("test if user can burn the wnft and send ccip message on destchain", async function () {
        //给池子授权
        await wnft.approve(nftPoolBurnAndMint.target, 0);
        //水龙头 求币
        await ccipLocalSimulator.requestLinkFromFaucet(nftPoolBurnAndMint, ethers.parseEther("10"));

        //发送CCIP消息，烧毁wnft
        await nftPoolBurnAndMint.burnAndMint(
        0,
        firstAccount,
        chainSelector,
        nftPoolLockAndRelease.target
        );
        //检查wnft总供应量是否为0 
        const total = await wnft.totalSupply();
        expect(total).to.equal(0); 
    });

    it("test if the nft is released and owned by firstAccount in sourceChain", async function () {
            //检查nft是否被释放
            const ownerOfNft = await nft.ownerOf(0);
            expect(ownerOfNft).to.equal(firstAccount);  

    });
});