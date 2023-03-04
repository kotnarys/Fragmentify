import React, { useEffect, useState } from "react";

import { BrowserProvider, Contract } from "ethers";

import defaultProvider from "../Contract/abi/defaultProvider.js";
import abi from "../Contract/abi/marketToken/erc20abi.json";
import SellButton from "../Fill/Profile/SELL.js";

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
}) => {
  const [balance, setBalance] = useState();

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
  return (
    <>
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
                      {balance}/{count}
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
          <SellButton adr={tokenadr} />
        </>
      ) : null}
    </>
  );
};

export default ERC20Card;
