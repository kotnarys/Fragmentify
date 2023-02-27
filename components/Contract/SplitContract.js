import { Contract, InfuraProvider } from "ethers";

import contractAbi from "./abi/splitabi.json";

const defaultProvider = new InfuraProvider("goerli");

const contractAddress = "0x1970C4F71e18330836063645a41Fbfa1e3a690ac";

const split6 = new Contract(contractAddress, contractAbi, defaultProvider);

export default split6;
