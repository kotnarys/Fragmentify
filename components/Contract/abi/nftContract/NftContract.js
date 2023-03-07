import { Contract, InfuraProvider } from "ethers";

import contractAbi from "./nftabi.json";

const defaultProvider = new InfuraProvider(process.env.networkName);

const NFT8 = new Contract(process.env.nftContract, contractAbi, defaultProvider);

export default NFT8;
