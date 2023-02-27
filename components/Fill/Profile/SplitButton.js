import React from "react";

import { BrowserProvider, Contract, InfuraProvider, parseEther } from "ethers";

import contractAbi from "../../Contract/abi/nftabi.json";
import split6 from "../../Contract/SplitContract";

function SplitButton({
  setLoader,
  setIsVisible,
  NFTonMarket,
  fractionCount,
  period,
  piecePrice,
  count,
}) {
  const adr = NFTonMarket.contract.address;
  const idNFT = NFTonMarket.id.tokenId;
  const name = NFTonMarket.contractMetadata.name;
  const symbol = NFTonMarket.contractMetadata.symbol;

  const defaultProvider = new InfuraProvider("goerli");
  const NFT4 = new Contract(adr, contractAbi, defaultProvider);

  async function handleSplitClick() {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const splitb = split6.connect(signer);
    const nft = NFT4.connect(signer);

    try {
      setLoader(true);
      const aprove = await nft.approve(
        "0x1970C4F71e18330836063645a41Fbfa1e3a690ac",
        BigInt(idNFT)
      );
      await aprove.wait();
      const spliting = await splitb.split(
        adr,
        BigInt(count),
        BigInt(fractionCount),
        BigInt(parseEther(piecePrice)),
        BigInt(idNFT),
        name,
        symbol,
        BigInt(period)
      );
      await spliting.wait();
      setLoader(false);
      setIsVisible(false);
    } catch (error) {
      setLoader(false);
      console.error(error);
    }
  }
  return (
    <>
      <button className="greenbtn" onClick={handleSplitClick}>
        SPLIT
      </button>
    </>
  );
}

export default SplitButton;
