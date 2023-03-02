import {getMarketWithSigner} from "../../Contract/abi/market/getMarketWithSigner.js";
import {getMarketTokenWithSigner} from "../../Contract/abi/marketToken/getMarketTokenWithSigner.js"

const AddTokenToMarket = async ({amountRef, priceRef}) => {
    try {
        const approve = await getMarketTokenWithSigner.approve(
            "0x1970C4F71e18330836063645a41Fbfa1e3a690ac",
            BigInt(amountRef.current.value)
        )
        await approve.wait();
        const addToken = await getMarketWithSigner.addTokenToShop(
            BigInt(0), // price
            BigInt(10), //amount
            "" // erc20 contract address
        );
        await addToken.wait();
    } catch(error) {
        console.error(error)
    }
}

export default AddTokenToMarket;