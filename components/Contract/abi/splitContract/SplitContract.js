import { Contract, InfuraProvider } from "ethers";

import contractAbi from "./splitabi.json";

const defaultProvider = new InfuraProvider("goerli");

const contractAddress = process.env.splitContract;

const split7 = new Contract(contractAddress, contractAbi, defaultProvider);

export default split7;
