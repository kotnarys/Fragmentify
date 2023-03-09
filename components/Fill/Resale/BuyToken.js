import React from "react";

import { BrowserProvider } from "ethers";

import marketContract from "../../Contract/abi/market/marketContract";

function BuyButton({ totalPrice, tokenid, tokenadr, loader, setLoader }) {
  async function handleBuyClick() {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const market = marketContract.connect(signer);
    try {
      setLoader(true);
      const buy = await market.buyToken(tokenadr, tokenid, {
        value: totalPrice,
      });
      await buy.wait();
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  }
  return (
    <>
      {loader ? (
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] my-3"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      ) : (
        <button onClick={handleBuyClick} className="violetbtn">
          BUY
        </button>
      )}
    </>
  );
}

export default BuyButton;