import React, { useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import uuid from "react-uuid";
import split7 from "../../Contract/abi/splitContract/SplitContract";
import NftCard from "../../NFT/NftCard.jsx";
import handleJoinClick from "./JoinButton";
import BalanceOf from "./BalanceOf.js";

function Profile({
  address,
  NFTsOnMarket,
  setIsVisible,
  NFTs,
  setNFTonMarket,
}) {
  function handleSplitClick(NFT) {
    setNFTonMarket(NFT);
    setIsVisible(true);
  }
  const [myVaultid, setMyVaultId] = useState();
  const [myVault, setMyVault] = useState([]);
  const [allVault, setAllVault] = useState([]);
  const [tokenContract, setTokenContract] = useState();
  const [tokenAddress, setTokenAddress] = useState();
  const [maxTokenSupply, setMaxTokenSupply] = useState();


  async function myVaults(id, contract) {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const splitb = split7.connect(signer);

      const vaultlength = Number(await splitb.vaultId());
      for (let i = 1; i < vaultlength; i++) {
        const vault = await splitb.getVault(BigInt(i));

        if (vault[0].toLowerCase() == contract && vault[3] == BigInt(id)) {
          setMyVaultId(i);
        }

        if (vault[1].toLowerCase() === address) {
          setMyVault((myVault) => [...myVault, vault]);
        }
      }
  }
  useEffect(() => {
    if (myVaultid > 0) {
      handleJoinClick(myVaultid);
    }
  }, [myVaultid]);

  useEffect(() => {
    myVaults();
  }, [address]);

  return (
    <>
      <div>
        <div className="flex flex-col items-center">
          <h2 className="pt-2 text-3xl text-white font-lalezar">ON WALLET</h2>
          <div className="bg-white w-11/12 h-0.5"></div>
        </div>
        <div className="min-h-[330px] flex pt-5 justify-center">
          <div>
            <section className="flex flex-wrap justify-center">
              {NFTs ? (
                NFTs.map((NFT) => {
                  return (
                    <div
                      className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover: duration-150 flex flex-col items-center "
                      key={uuid()}
                    >
                      <NftCard
                        image={NFT.media[0].gateway}
                        id={NFT.id.tokenId}
                        title={NFT.title}
                        address={NFT.contract.address}
                      ></NftCard>

                      <button
                        id="splitbutton"
                        className="greenbtn m-2"
                        onClick={(e) => {
                          if (e.target.id == "splitbutton") {
                            handleSplitClick(NFT);
                          }
                        }}
                      >
                        SPLIT
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="text-white m-32 3xl font-lalezar flex justify-center">
                  Connect Wallet!
                </div>
              )}
            </section>
          </div>
          {/* <div>
            <section className="flex flex-wrap justify-center">
              {NFTsOnMarket ? (
                NFTsOnMarket.map((NFT) => {
                  for (let i = 1; i < allVault.length; i++) {
                    if (
                      allVault[i][0] !== "0x0000000000000000000000000000000000000000" &&
                      allVault[i][0].toLowerCase() == NFT.contract.address &&
                      allVault[i][3] == BigInt(NFT.id.tokenId)
                    ) {
                    console.log(allVault[i][7])
                        return (
                          <div
                            className=" transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover: duration-150 flex flex-col items-center "
                            key={uuid()}
                          >
                            <NftCard
                              image={NFT.media[0].gateway}
                              title={NFT.title}
                              address={NFT.contract.address}
                              count={
                                <>
                                  {BalanceOf("0xfA200e34D8E9d5dB8B5cDbd6DF5E6ff3D3A62024", address)}/
                                  {Number(allVault[i][5])}
                                </>
                              }
                            ></NftCard>
                            {allVault[i][4] > 0 ? (
                              <></>
                            ) : (
                              <button
                                id="joinButton"
                                className=" greenbtn m-2"
                                onClick={(e) => {
                                  if (e.target.id == "joinButton") {
                                    myVaults(
                                      NFT.id.tokenId,
                                      NFT.contract.address
                                    );
                                  }
                                }}
                              >
                                GET BACK
                              </button>
                            )}
                          </div>
                        );
                      }
                    }
                  }
                )
              ) : (
                <div className="text-white m-32 3xl font-lalezar flex justify-center">
                  Connect Wallet!
                </div>
              )}
            </section>
          </div> */}
        </div>
      </div>

      <div>
        <div className="flex flex-col items-center">
          <h2 className="pt-2 text-3xl text-white font-lalezar">ON MARKET</h2>
          <div className="bg-white w-11/12 h-0.5"></div>
        </div>

        <div className="min-h-[330px] flex pt-5 justify-center">
          <div>
            <section className="flex flex-wrap justify-center">
              {NFTsOnMarket ? (
                NFTsOnMarket.map((NFT) => {
                  for (let i = 0; i < myVault.length; i++) {
                    if (
                      myVault[i][0].toLowerCase() == NFT.contract.address &&
                      myVault[i][3] == BigInt(NFT.id.tokenId)
                    ) {
                      return (
                        <div
                          className=" transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover: duration-150 flex flex-col items-center "
                          key={uuid()}
                        >
                          <NftCard
                            image={NFT.media[0].gateway}
                            title={NFT.title}
                            address={NFT.contract.address}
                            count={
                              <>
                                PURCHASED: {Number(myVault[i][4])}/
                                {Number(myVault[i][5])}
                              </>
                            }
                          ></NftCard>
                          {myVault[i][4] > 0 ? (
                            <></>
                          ) : (
                            <button
                              id="joinButton"
                              className=" greenbtn m-2"
                              onClick={(e) => {
                                if (e.target.id == "joinButton") {
                                  myVaults(
                                    NFT.id.tokenId,
                                    NFT.contract.address
                                  );
                                }
                              }}
                            >
                              GET BACK
                            </button>
                          )}
                        </div>
                      );
                    }
                  }
                })
              ) : (
                <div className="text-white m-32 3xl font-lalezar flex justify-center">
                  Connect Wallet!
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
