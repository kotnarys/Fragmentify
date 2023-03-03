import React from "react";

import { BrowserProvider } from "ethers";

import NFT8 from "./Contract/abi/nftContract/NftContract.js";

function MintButton({ address }) {
  async function handleMintClick() {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const nft = NFT8.connect(signer);

    try {
      await nft.safeMint(
        address,
        "QmPnSHCKbBD81K7sKUi4BVn7KgnkaSrzMYTwA8MVyHwVmL "
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <button
        className="rounded-full w-28 h-8 m-2 font-lalezar hover:opacity-80 active:translate-y-0.5 bg-white text-black"
        onClick={handleMintClick}
      >
        MINT
      </button>
    </>
  );
}

export default MintButton;
