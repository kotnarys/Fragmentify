<<<<<<< HEAD
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
=======

import { BrowserProvider, Contract } from "ethers";
import abi from "../../Contract/abi/marketToken/erc20abi.json"
import defaultProvider from "../../Contract/abi/defaultProvider.js"

async function BalanceOf(tokenAddress, address) {
    // if (!tokenAddress) {
    //     return null
    // }
    console.log("aoos", tokenAddress)
    let tokenBalance;
    // const [balance, setBalance] = useState();
    const erc20token = new Contract(tokenAddress, abi, defaultProvider);
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const token = erc20token.connect(signer);
    

    try {
        tokenBalance = await token.balanceOf(address);
        // setBalance(balanceOf)
        console.log(Number(tokenBalance))
    } catch (error) {
        console.error(error);
    }
       

    return tokenBalance
>>>>>>> f73db83cab2018568481a107b2e900bc21c3252b
}

export default BalanceOf;
