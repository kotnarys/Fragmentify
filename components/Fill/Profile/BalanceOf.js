
import { BrowserProvider, Contract } from "ethers";
import abi from "../../Contract/abi/marketToken/erc20abi.json"
import defaultProvider from "../../Contract/abi/defaultProvider.js"

async function BalanceOf({tokenAddress, address}) {

    const adr = tokenAddress;
    const erc20token = new Contract(adr, abi, defaultProvider);

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const token = erc20token.connect(signer);

    try {
        const balanceOf = await token.balanceOf(address);
        setBalance(balanceOf)
        console.log(Number(balanceOf))
    } catch (error) {
        console.error(error);
    }
}

export default BalanceOf;
