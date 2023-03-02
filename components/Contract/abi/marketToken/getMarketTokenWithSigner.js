import marketToken from "./marketToken.js"
import walletProvider from "../walletProvider.js"

const getMarketWithSigner = async () => {
    const signer = await walletProvider.getSigner();
    const marketTokenWithSigner = marketToken.connect(signer);

    return marketTokenWithSigner;
}

export default getMarketWithSigner;