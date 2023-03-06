import React, { useState } from "react";
import { BrowserProvider, Contract, InfuraProvider, parseEther } from "ethers";
import marketContract from "../../Contract/abi/market/marketContract";
import contractAbi from "../../Contract/abi/nftContract/nftabi.json";

function SellButton({ adr, loader, setLoader, active, setActive }) {
  const [price, setPrice] = useState();
  const [amount, setAmount] = useState();

  const defaultProvider = new InfuraProvider("goerli");
  const erc20 = new Contract(adr, contractAbi, defaultProvider);

  const handleSetActiveClick = () => {
    setActive(false);
  };

  async function handleSellSubmit(e) {
    e.preventDefault();
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const erc20token = erc20.connect(signer);
    const market = marketContract.connect(signer);

    try {
      setLoader(true);
      const aprove = await erc20token.approve(
        "0x47ca9D580EC559e725920B0a6F6729E487816232",
        BigInt(amount)
      );
      await aprove.wait();
      const addToken = await market.addTokenToShop(
        BigInt(parseEther(price)),
        BigInt(amount),
        adr
      );
      await addToken.wait();
    } catch (error) {
      console.error(error);
    } finally {
      setActive(true);
      setPrice("");
      setAmount("");
      setLoader(false);
    }
  }

  return loader ? (
    <div
      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] my-3"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  ) : active ? (
    <button onClick={handleSetActiveClick} className="redbtn">
      SELL
    </button>
  ) : (
    <form
      onSubmit={handleSellSubmit}
      className="flex flex-col items-center space-y-2"
    >
      <div className="flex flex-row mt-2 space-x-2">
        <input
          value={price}
          placeholder="ETH price"
          type="number"
          min={0.001}
          step={0.001}
          className="enterbtn"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <input
          type="number"
          value={amount}
          min={1}
          step={1}
          placeholder="Enter amount"
          className="enterbtn"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </div>
      {price >= 0.001 && amount >= 1 ? (
        <button className="redbtn">SELL</button>
      ) : (
        <button
          onClick={() => alert("Wrong input data")}
          disabled={!(price >= 0.001 || amount >= 1)}
          className="disabledredbtn"
        >
          SELL
        </button>
      )}
    </form>
  );
}

export default SellButton;
