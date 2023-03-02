import React, { useRef, useState } from "react";
import NftCard from "../../NFT/NftCard.jsx";
import AddTokenToMarket from "./AddTokenToMarket";

const Resale = () => {
  const amountRef = useRef();
  const priceRef = useRef();

  const handleAddTokenButton = (event) => {
    event.preventDefault();
    AddTokenToMarket(amountRef, priceRef);
    console.log("Кнопка нажалась");
  };

  return (
    <>
      <div className="h-96 flex flex-col items-center">
        <div className="flex flex-col items-center w-full">
          <h2 className="pt-3 text-3xl text-white font-lalezar">Wallet</h2>
          <div className="bg-white w-5/6 h-0.5"></div>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-50 flex flex-col items-center justify-center bg-slate-300  border-black rounded-md  mt-4 mb-2">
            <img
              className="h-60 m-3 border-gray-500 border 1"
              src="/NFT_2.jpg"
            />
          </div>
          <form
            onFormSubmit={AddTokenToMarket(amountRef, priceRef)}
            className="flex flex-col items-center justify-center"
          >
            <div className="flex flex-row justify-center">
              <label htmlFor="amount"></label>
              <input
                className="h-5 mr-2 bg-nftbg w-20 text-center rounded-md hover:border-slate-200 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 focus:outline-none focus:bg-white focus:border-gray-500"
                id="amount"
                ref={amountRef}
                placeholder="amount"
              />
              <label htmlFor="price"></label>
              <input
                className="h-5 bg-nftbg w-20 text-center rounded-md hover:border-slate-200 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 focus:outline-none focus:bg-white focus:border-gray-500"
                id="amount"
                ref={priceRef}
                placeholder="price"
              />
            </div>
            <button className="addtomarketbtn w-44">Add to market</button>
          </form>
        </div>
        <div className="flex flex-col items-center w-full">
          <h2 className="pt-2 text-3xl text-white font-lalezar">Market</h2>
          <div className="bg-white w-5/6 h-0.5"></div>
        </div>
        <div className="flex flex-col items-center ">
          <div className="h-50 flex flex-col items-center justify-center bg-slate-300  border-black rounded-md  mt-4 mb-2">
            <img
              className="h-60 m-3 border-gray-500 border 1"
              src="/NFT_2.jpg"
            />
            <h2 className="pricebtn w-28 mb-3">0.25 ETH</h2>
          </div>
          <button className="buybtn w-44">Buy</button>
        </div>
      </div>
    </>
  );
};

export default Resale;
