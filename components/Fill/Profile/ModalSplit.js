import React, { useState } from "react";

import SplitButton from "./SplitButton";

function SplitModal({ setIsVisible, isVisible, onClose, NFTonMarket }) {
  const [count, setCount] = useState("");
  const [piecePrice, setPiecePrice] = useState("");
  const [period, setPeriod] = useState("");
  const [fractionCount, setFractionCount] = useState("");
  const [loader, setLoader] = useState(false);

  if (!isVisible) return null;

  function handleClose(e) {
    if (e.target.id == "wrapper") onClose();
  }

  function handleFormSplitSubmit(e) {
    e.preventDefault();
  }

  return (
    <div
      className="  fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className=" animate-pulsets w-[1000px] flex flex-col">
        <div className="bg-slate-700 rounded-lg">
          <div className=" flex justify-center h-[700px] text-black">
            <div className="flex items-center flex-col">
              <h1 className="text-center my-3 text-white font-lalezar text-5xl">
                SPLIT
              </h1>
              <form
                className="flex items-center justify-center h-[570px]"
                onSubmit={handleFormSplitSubmit}
              >
                <div className="flex flex-col items-center ">
                  <label
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    htmlFor="Count"
                    className="text-xl mb-3 p-1 font-lalezar flex flex-col items-center justify-center bg-nftbg w-[436px] text-black rounded-lg"
                  >
                    Total supply:
                    <input
                      id="Count"
                      className=" h-5 bg-nftbg w-40 text-black text-center"
                      placeholder="2-99999"
                    />
                  </label>
                  <label
                    value={piecePrice}
                    onChange={(e) => setPiecePrice(e.target.value)}
                    htmlFor="PiecePrice"
                    className="text-xl m-3 p-1 font-lalezar flex flex-col items-center bg-nftbg w-[436px] text-black rounded-lg"
                  >
                    Price for 1 piece:
                    <input
                      id="PiecePrice"
                      className=" h-5 bg-nftbg w-40 text-black text-center"
                      placeholder="ETH"
                    />
                  </label>
                  <h2 className="flex text-white font-lalezar w-[436px] text-center text-xl">
                    if you want to protect your nft, you can ask for how many
                    hours and how many parts you need to buy for a successful
                    separation, otherwise you will get the nft back, else don't
                    touch this inputs
                  </h2>
                  <div className="flex">
                    <label
                      value={period}
                      onChange={(e) => setPeriod(e.target.value)}
                      htmlFor="Period"
                      className="text-xl m-1 p-1 font-lalezar flex flex-col items-center bg-nftbg w-52 text-black rounded-lg"
                    >
                      Lock period:
                      <input
                        id="Period"
                        className=" h-5 bg-nftbg w-40 text-black text-center"
                        placeholder="*30sec"
                      />
                    </label>
                    <label
                      value={fractionCount}
                      onChange={(e) => setFractionCount(e.target.value)}
                      htmlFor="Fraction count"
                      className="text-xl m-1 p-1 font-lalezar flex flex-col items-center bg-nftbg w-2/3 text-black rounded-lg"
                    >
                      Minimum mint quantity:
                      <input
                        id="Fraction count"
                        className="flex h-5 bg-nftbg w-40 text-black text-center"
                        placeholder="1-99999"
                      />
                    </label>
                  </div>
                  <div className="mt-7">
                    <SplitButton
                      setLoader={setLoader}
                      setIsVisible={setIsVisible}
                      NFTonMarket={NFTonMarket}
                      fractionCount={fractionCount}
                      period={period}
                      piecePrice={piecePrice}
                      count={count}
                    />
                  </div>
                </div>
                <div className="w-[480px]  bg-white h-[490px] ml-5 flex items-center justify-center rounded-lg">
                  <img
                    src={NFTonMarket.media[0].gateway}
                    className="w-[460px] border-b-8 border-slate-400 border 1"
                  />
                </div>
              </form>
              <div>
                {loader ? (
                  <div className="w-24">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="flex items-center justify-center">
                        <div
                          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                          role="status"
                        >
                          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                            Loading...
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplitModal;
