import { Contract, InfuraProvider } from "ethers";

import contractAbi from "./splitabi.json"

const defaultProvider = new InfuraProvider("goerli");

const contractAddress = "0xe9B8bc5179B9e95C6fdd91DCEDC1C19ee1Af0Dad";

const split7 = new Contract(contractAddress, contractAbi, defaultProvider);

export default split7;
