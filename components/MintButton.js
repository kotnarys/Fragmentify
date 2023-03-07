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
        className="mintwalletbtn"
        onClick={handleMintClick}
      >
        TEST MINT
      </button>
    </>
  );
}

export default MintButton;
