
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
}

export default BalanceOf;
