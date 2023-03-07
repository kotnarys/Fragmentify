import React, { Fragment, useEffect, useState } from "react";

import Link from "next/link";

import Marketplace from "./Fill/Marketplace/Marketplace.js";
import SplitModal from "./Fill/Profile/ModalSplit";
import Profile from "./Fill/Profile/Profile";
import Resale from "./Fill/Resale/Resale.js";
import MintButton from "./MintButton";
import fetchNFTs from "./NFT/fetchNFTs.js";

export default function Pattern() {
  const [NFTonMarket, setNFTonMarket] = useState([]);
  const [page, setPage] = useState("profile");
  const [address, setAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [NFTs, setNFTs] = useState("");
  const [NFTsOnMarket, setNFTsOnMarket] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [loader, setLoader] = useState(false);

  const handleConnectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAddress(accounts[0]);
      fetchNFTs(accounts[0], contractAddress, setNFTs);
      fetchNFTs(
        process.env.splitContract,
        contractAddress,
        setNFTsOnMarket
      );
    } catch (error) {
      console.error(error);
    }
  };
  const connectMarketPlace = async () => {
    try {
      fetchNFTs(
        process.env.splitContract,
        contractAddress,
        setNFTsOnMarket
      );
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    connectMarketPlace();
  }, []);

  return (
    <>
      <Fragment>
        <div className="bg-gradient-to-r  from-violet-300 to-fuchsia-300">
          <nav className="flex justify-between pr-16 place-items-center align-middle">
            <Link href="/Home" className="p-1">
              <img
                src="/home.png"
                className="h-12 active:translate-y-1 hover:opacity-80 mt-2 ml-2"
                alt="HOME"
              />
            </Link>
            <div className="flex pl-40">
              <button
                disabled={page === "market" ? 1 : 0}
                onClick={() => setPage("market")}
                className="menu"
              >
                PRIMARY
              </button>
              <h3 className="p-2 text-3xl font-lalezar">|</h3>
              <button
                disabled={page === "resale" ? 1 : 0}
                onClick={() => {
                  setPage("resale");
                }}
                className="menu"
              >
                RESALE
              </button>
              <h3 className="p-2 text-3xl font-lalezar">|</h3>
              <button
                disabled={page === "profile" ? 1 : 0}
                onClick={() => {
                  setPage("profile");
                }}
                className="menu"
              >
                PROFILE
              </button>
            </div>
            <div className="flex items-center space-x-3 ">
              <MintButton address={address} loader={loader} setLoader={setLoader}/>
              {address ? (
                <p className="mintwalletbtn">{`${address.slice(
                  0,
                  4
                )}...${address.slice(address.length - 4)}`}</p>
              ) : (
                <button
                  className="mintwalletbtn"
                  onClick={handleConnectWallet}
                >
                  Connect wallet
                </button>
              )}
            </div>
          </nav>
          <div className=" flex justify-center">
            <div className="min-h-[865px] w-11/12 mb-5 rounded-md bg-gradient-to-br from-gray-500 to-gray-600">
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