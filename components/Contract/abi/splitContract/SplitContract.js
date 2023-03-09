import { Contract, InfuraProvider } from "ethers";

import contractAbi from "./splitabi.json";

const defaultProvider = new InfuraProvider(process.env.networkName);

const split7 = new Contract(process.env.splitContract, contractAbi, defaultProvider);

export default split7;
