import { BrowserProvider, Contract } from "ethers";

import defaultProvider from "../../Contract/abi/defaultProvider.js";
import abi from "../../Contract/abi/marketToken/erc20abi.json";

async function BalanceOf(tokenAddress, address, setBalance) {
  console.log(tokenAddress, address);
  const adr = tokenAddress;

  if (adr) {
    const erc20token = new Contract(adr, abi, defaultProvider);

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const token = erc20token.connect(signer);

    try {
      const balanceOf = await token.balanceOf(address);
      setBalance(balanceOf);
    } catch (error) {
      console.error(error);
    }
  }
}

export default BalanceOf;