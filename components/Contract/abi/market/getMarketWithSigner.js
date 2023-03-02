import marketContract from "./marketContract";
import walletProvider from "../walletProvider";

const getMarketWithSigner = async () => {
    const signer = await walletProvider.getSigner()
    const martketWithSigner = marketContract.connect(signer);

    return martketWithSigner;
}

export default getMarketWithSigner;