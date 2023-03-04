import { Contract, InfuraProvider } from "ethers";

import contractAbi from "./splitabi.json";

const defaultProvider = new InfuraProvider("goerli");

const contractAddress = "0xcf02e7843de8E0d25858b5736494B2af1c679E33";

const split7 = new Contract(contractAddress, contractAbi, defaultProvider);

export default split7;
