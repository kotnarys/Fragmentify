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
        "QmS5doNV9CuxMtWS6cWgTuogv97TtXi91t9Exk42V5GaXh "
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <button
        className="bg-white rounded-md font-lalezar h-7 transition duration-500 w-20"
        onClick={handleMintClick}
      >
        MINT
      </button>
    </>
  );
}

export default MintButton;
