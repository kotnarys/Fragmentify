import { Contract, InfuraProvider } from "ethers";

import contractAbi from "./nftabi.json";

const defaultProvider = new InfuraProvider("goerli");

const contractAddress = "0xaa482f1AA0Fb90eD0260d77fD86996b818e2d572";

const NFT8 = new Contract(contractAddress, contractAbi, defaultProvider);

export default NFT8;
