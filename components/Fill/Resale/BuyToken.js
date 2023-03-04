import React from 'react';

import { BrowserProvider } from 'ethers';

import marketContract from '../../Contract/abi/market/marketContract';

function BuyButton({ totalPrice, tokenid, tokenadr }) {
  async function handleBuyClick() {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const market = marketContract.connect(signer);
    try {
      await market.buyToken(tokenadr, tokenid, {
        value: totalPrice,
      });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <button onClick={handleBuyClick} className=" m-2 greenbtn">
        BUY
      </button>
    </>
  );
}

export default BuyButton;
