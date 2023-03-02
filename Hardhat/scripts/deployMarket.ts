import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with the account: ", deployer.address);

  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy();

  await marketplace.deployed();

  console.log(`contract address: ${marketplace.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
