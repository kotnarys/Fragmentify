import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Marketplace from "./Fill/Marketplace/Marketplace.js";
import SplitModal from "./Fill/Profile/ModalSplit";
import Profile from "./Fill/Profile/Profile";
import Resale from "./Fill/Resale/Resale.js";
import MintButton from "./MintButton";
import { fetchNFTs } from "./NFT/fetchNFTs.js";

export default function Pattern() {
  const [NFTonMarket, setNFTonMarket] = useState([]);
  const [page, setPage] = useState("profile");
  const [address, setAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [NFTs, setNFTs] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [NFTsOnMarket, setNFTsOnMarket] = useState("");

  const handleConnectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAddress(accounts[0]);
      fetchNFTs(accounts[0], contractAddress, setNFTs);
      fetchNFTs(
        "0xe9B8bc5179B9e95C6fdd91DCEDC1C19ee1Af0Dad",
        contractAddress,
        setNFTsOnMarket
      );

      return address[0];
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleConnectWallet();
  }, []);

  return (
    <>
      <Fragment>
        <div className="bg-patternbg">
          <nav className="flex justify-between p-3 place-items-center">
            <Link href="/Home" className="p-1">
              <img
                src="/home.png"
                className="h-12 active:translate-y-1 hover:opacity-80"
                alt="HOME"
              />
            </Link>
            <div className="flex pl-40">
              <button
                disabled={page === "market" ? 1 : 0}
                onClick={() => setPage("market")}
                className="p-2 text-3xl active:translate-y-1 hover:text-gray-400 font-lalezar disabled:text-gray-500 disabled:active:translate-y-0"
              >
                PRIMARY
              </button>
              <h3 className="p-2 text-3xl font-lalezar">|</h3>
              <button
                disabled={page === "resale" ? 1 : 0}
                onClick={() => {
                  setPage("resale");
                }}
                className="p-2 text-3xl active:translate-y-1 hover:text-gray-400 font-lalezar disabled:text-gray-500 disabled:active:translate-y-0"
              >
                RESALE
              </button>
              <h3 className="p-2 text-3xl font-lalezar">|</h3>
              <button
                disabled={page === "profile" ? 1 : 0}
                onClick={() => {
                  setPage("profile");
                }}
                className="p-2 text-3xl active:translate-y-1 hover:text-gray-400 font-lalezar disabled:text-gray-500 disabled:active:translate-y-0"
              >
                PROFILE
              </button>
            </div>
            <div className="flex">
              <MintButton address={address} />
              {address ? (
                <p className="bg-white rounded-full font-lalezar p-1 m-2">{`${address.slice(
                  0,
                  4
                )}...${address.slice(address.length - 4)}`}</p>
              ) : (
                <button
                  className="bg-white rounded-full font-lalezar w-48 h-7"
                  onClick={handleConnectWallet}
                >
                  Connect MetaMask
                </button>
              )}
            </div>
          </nav>
          <div className=" flex justify-center">
            <div className="min-h-[865px] bg-grays w-11/12 mb-5 rounded-md">
              {page === "market" ? (
                <Marketplace
                  address={address}
                  NFTsOnMarket={NFTsOnMarket}
                  setIsVisible={setShowModal}
                  setNFTonMarket={setNFTonMarket}
                />
              ) : page === "resale" ? (
                <Resale
                  address={address}
                  NFTsOnMarket={NFTsOnMarket}
                  setIsVisible={setShowModal}
                  NFTs={NFTs}
                  setNFTonMarket={setNFTonMarket}
                />
              ) : (
                <Profile
                  address={address}
                  NFTsOnMarket={NFTsOnMarket}
                  setIsVisible={setShowModal}
                  NFTs={NFTs}
                  setNFTonMarket={setNFTonMarket}
                />
              )}
            </div>
          </div>
        </div>
        <SplitModal
          setIsVisible={setShowModal}
          isVisible={showModal}
          onClose={() => setShowModal(false)}
          NFTonMarket={NFTonMarket}
        />
      </Fragment>
    </>
  );
}
