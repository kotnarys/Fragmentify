import { BrowserProvider } from "ethers";

let walletProvider;

if (typeof walletProvider !== "undefined"  && typeof window.ethereum !== "undefined") {
    walletProvider = new BrowserProvider(window.ethereum);
}

export default walletProvider;