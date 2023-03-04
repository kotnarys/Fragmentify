import React from "react";

import { BrowserProvider, Contract, InfuraProvider, parseEther } from "ethers";

import contractAbi from "../../Contract/abi/nftContract/nftabi.json";
import split7 from "../../Contract/abi/splitContract/SplitContract";

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
    const splitb = split7.connect(signer);
    const nft = NFT4.connect(signer);

    try {
      setLoader(true);
      const aprove = await nft.approve(
        "0xcf02e7843de8E0d25858b5736494B2af1c679E33",
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
      setIsVisible(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  }
  return (
    <>
      <button
        className="pricebtn flex justify-center w-72 h-10"
        onClick={handleSplitClick}
      >
        SPLIT
      </button>
    </>
  );
}

export default SplitButton;
