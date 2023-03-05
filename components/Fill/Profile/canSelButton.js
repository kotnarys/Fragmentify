import React from "react";

import { BrowserProvider } from "ethers";

import marketContract from "../../Contract/abi/market/marketContract";

function CancelSellButton({ tokenid, tokenadr }) {
  async function handleSellClick() {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const market = marketContract.connect(signer);
    try {
      await market.removeTokenFromShop(tokenid, tokenadr);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <button onClick={handleSellClick} className="m-2 buybtn">
        CANCEL SELL
      </button>
    </>
  );
}

export default CancelSellButton;
