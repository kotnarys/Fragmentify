import React, { useState } from 'react';

import { BrowserProvider } from 'ethers';

import split6 from '../../Contract/SplitContract';

function PurchaseButton({ price, myVaultid }) {
  const [count, setCount] = useState("");

  async function handleJoinClick(e) {
    e.preventDefault();
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const splitb = split6.connect(signer);
    const totalPrice = price * BigInt(count);
    const id = myVaultid + 1;

    try {
      await splitb.order(id, BigInt(count), { value: totalPrice });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <form onSubmit={handleJoinClick}>
        <input
          value={count}
          placeholder="Enter count"
          className=" w-24 h-8 mr-5 text-center font-lalezar"
          onChange={(e) => {
            setCount(e.target.value);
          }}
        />
        <button className="violetbtn">ORDER</button>
      </form>
    </>
  );
}

export default PurchaseButton;
