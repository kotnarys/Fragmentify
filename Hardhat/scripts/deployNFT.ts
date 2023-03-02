import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with the account: ", deployer.address);

  const Hromofoxes = await ethers.getContractFactory("Hromofoxes");
  const hromofoxes = await Hromofoxes.deploy();

  await hromofoxes.deployed();

  console.log(`contract address: ${hromofoxes.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
