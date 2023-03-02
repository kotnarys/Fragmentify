import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with the account: ", deployer.address);

  const LilFractional = await ethers.getContractFactory("LilFractional");
  const fractional = await LilFractional.deploy();

  await fractional.deployed();

  console.log(`contract address: ${fractional.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
