import React, { useEffect, useState } from "react";

import { BrowserProvider, Contract } from "ethers";

import defaultProvider from "../Contract/abi/defaultProvider.js";
import abi from "../Contract/abi/marketToken/erc20abi.json";
import CancelSellButton from "../Fill/Profile/canSelButton.js";
import handleJoin from "../Fill/Profile/join.js";
import SellButton from "../Fill/Profile/SELL.js";
import BuyButton from "../Fill/Resale/BuyToken.js";

const ERC20Card = ({
  image,
  id,
  title,
  address,
  description,
  attributes,
  tokenadr,
  count,
  price,
  amount,
  tokenid,
  totalPrice,
  myVaultid,
  seller,
  cansel,
  myAddr,
}) => {
  const [balance, setBalance] = useState();
  const [loader, setLoader] = useState(false);
  const [active, setActive] = useState(true);

  function handleJoinClick(myVaultid) {
    handleJoin(myVaultid, balance, tokenadr);
  }

  useEffect(() => {
    BalanceOf(tokenadr, address);

    async function BalanceOf(tokenAddress, address) {
      const adr = tokenAddress;

      if (adr) {
        const erc20token = new Contract(adr, abi, defaultProvider);

        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const token = erc20token.connect(signer);

        try {
          const balanceOf = await token.balanceOf(address);
          setBalance(Number(balanceOf));
        } catch (error) {
          console.error(error);
        }
      }
    }
  }, []);
  {
  }
  return (
    <>
      {cansel == "cancelsell" ? (
        myAddr == seller.toLowerCase() ? (
          <>
            {" "}
            <>
              {balance ? (
                <>
                  <div className="w-56  mr-3  ml-3 bg-slate-100 rounded-lg">
                    <div className="flex w-56 h-56 justify-center items-center rounded-xl bg-nftbg">
                      {image ? (
                        <img
                          className="flex justify-center items-center w-52 h-52"
                          key={id}
                          src={image}
                        ></img>
                      ) : (
                        "NO IMAGE"
                      )}
                    </div>

                    <div className="p-3">
                      <div>
                        <div className="flex-grow">
                          <h2 className="text-xl font-lalezar flex flex-col items-center">
                            {title}
                          </h2>

                          {count ? (
                            <h2 className="text-xl font-lalezar flex flex-col items-center">
                              {address ==
                              "0x47ca9D580EC559e725920B0a6F6729E487816232"
                                ? Number(amount)
                                : balance}
                              /{count}
                            </h2>
                          ) : null}

                          {price ? (
                            <h2 className="text-xl font-lalezar flex flex-col items-center">
                              {price}
                            </h2>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CancelSellButton
                    tokenadr={tokenadr}
                    tokenid={tokenid}
                    loader={loader}
                    setLoader={setLoader}
                  />
                </>
              ) : null}
            </>
          </>
        ) : null
      ) : (
        <>
          {" "}
          {balance ? (
            <>
              {" "}
              <div className="w-56  mr-3  ml-3 bg-slate-100 rounded-lg">
                <div className="flex w-56 h-56 justify-center items-center rounded-xl bg-nftbg">
                  {image ? (
                    <img
                      className="flex justify-center items-center w-52 h-52"
                      key={id}
                      src={image}
                    ></img>
                  ) : (
                    "NO IMAGE"
                  )}
                </div>

                <div className="p-3">
                  <div>
                    <div className="flex-grow">
                      <h2 className="text-xl font-lalezar flex flex-col items-center">
                        {title}
                      </h2>

                      {count ? (
                        <h2 className="text-xl font-lalezar flex flex-col items-center">
                          {address ==
                          "0x47ca9D580EC559e725920B0a6F6729E487816232"
                            ? Number(amount)
                            : balance}
                          /{count}
                        </h2>
                      ) : null}

                      {price ? (
                        <h2 className="text-xl font-lalezar flex flex-col items-center">
                          {price}
                        </h2>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              {address != "0x47ca9D580EC559e725920B0a6F6729E487816232" ? (
                <SellButton
                  adr={tokenadr}
                  loader={loader}
                  setLoader={setLoader}
                  active={active}
                  setActive={setActive}
                />
              ) : (
                <BuyButton
                  loader={loader}
                  setLoader={setLoader}
                  tokenadr={tokenadr}
                  tokenid={tokenid}
                  totalPrice={totalPrice}
                />
              )}
              {Number(balance) == count ? (
                <button
                  id="joinbtn"
                  className="greenbtn mt-3"
                  onClick={(e) => {
                    if (e.target.id == "joinbtn") {
                      handleJoinClick(myVaultid);
                    }
                  }}
                >
                  JOIN
                </button>
              ) : null}
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export default ERC20Card;
