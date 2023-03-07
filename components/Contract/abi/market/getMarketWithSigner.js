import marketContract from "./marketContract";
import walletProvider from "../walletProvider";

const getMarketWithSigner = async () => {
    const signer = await walletProvider.getSigner()
    return marketContract.connect(signer);
}

export default getMarketWithSigner;
