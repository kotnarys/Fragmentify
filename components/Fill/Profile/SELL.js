import React, { useState } from "react";

import { BrowserProvider, Contract, InfuraProvider, parseEther } from "ethers";

import marketContract from "../../Contract/abi/market/marketContract";
import contractAbi from "../../Contract/abi/nftContract/nftabi.json";

function SellButton({ adr }) {
  const [price, setPrice] = useState();
  const [amount, setAmount] = useState();

  const defaultProvider = new InfuraProvider("goerli");
  const erc20 = new Contract(adr, contractAbi, defaultProvider);

  async function handleSellSubmit(e) {
    e.preventDefault();
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const erc20token = erc20.connect(signer);
    const market = marketContract.connect(signer);
    try {
      const aprove = await erc20token.approve(
        "0x47ca9D580EC559e725920B0a6F6729E487816232",
        BigInt(amount)
      );
      await aprove.wait();
      await market.addTokenToShop(
        BigInt(parseEther(price)),
        BigInt(amount),
        adr
      );
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <form onSubmit={handleSellSubmit}>
        <input
          value={price}
          placeholder="ETH price"
          className=" rounded-xl w-24 h-8 mr-5 text-center font-lalezar"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <input
          value={amount}
          placeholder="Enter amount"
          className=" rounded-xl w-24 h-8 mr-5 text-center font-lalezar"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
        <button className="redbtn flex justify-center w-72 h-10">SELL</button>
      </form>
    </>
  );
}

export default SellButton;
