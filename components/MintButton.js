import React from "react";

import { BrowserProvider } from "ethers";

import NFT8 from "./Contract/abi/nftContract/NftContract.js";

function MintButton({ address, loader, setLoader }) {
  async function handleMintClick() {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const nft = NFT8.connect(signer);

    try {
      setLoader(true);
      const mint = await nft.safeMint(
        address,
        process.env.uri
      );
      await mint.wait();
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
      alert("You've just minted a free NFT from Hromofoxes collection");
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
      ) : null}
      <button className="mintwalletbtn" onClick={handleMintClick}>
        TEST MINT
      </button>
    </>
  );
}

export default MintButton;