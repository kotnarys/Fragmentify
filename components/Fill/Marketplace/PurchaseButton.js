import React, { useState } from "react";

import { BrowserProvider } from "ethers";

import split7 from "../../Contract/abi/splitContract/SplitContract";

function PurchaseButton({ price, myVaultid, setActive, active }) {
  const [count, setCount] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSetActive = () => {
    setActive(false);
  };

  async function handleJoinClick(e) {
    e.preventDefault();
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const splitba = split7.connect(signer);
    const totalPrice = price * BigInt(count);
    const id = myVaultid;

    try {
      setLoader(true);
      const splitb = await splitba.order(id, BigInt(count), {
        value: totalPrice,
      });
      await splitb.wait();
    } catch (error) {
      console.error(error);
    } finally {
      setCount("");
      setActive(true);
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
    <button onClick={handleSetActive} className="greenbtn">
      ORDER
    </button>
  ) : (
    <form onSubmit={handleJoinClick}>
      <div className="flex flex-row space-x-2">
        <input
          value={count}
          min={1}
          step={1}
          type="number"
          placeholder="Enter count"
          className="enterbtn"
          onChange={(e) => {
            setCount(e.target.value);
          }}
        />
        {count >= 1 ? (
          <button className="orderbtn">ORDER</button>
        ) : (
          <button
            onClick={() => alert("Wrong input data")}
            disabled={count < 1}
            className="disabledorderbtn"
          >
            ORDER
          </button>
        )}
      </div>
    </form>
  );
}

export default PurchaseButton;
