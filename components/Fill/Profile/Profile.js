import React, { useEffect, useState } from "react";

import { BrowserProvider } from "ethers";
import uuid from "react-uuid";

import marketContract from "../../Contract/abi/market/marketContract";
import split7 from "../../Contract/abi/splitContract/SplitContract";
import ERC20Card from "../../NFT/ERC20Card.jsx";
import NftCard from "../../NFT/NftCard.jsx";
import handleJoinClick from "./JoinButton";

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
  const [token, setToken] = useState([]);

  async function myVaults(id, contract) {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const splitb = split7.connect(signer);
    const market = marketContract.connect(signer);

    const tokenslength = Number(await market.tokenCount());
    const arr1 = [];
    for (let i = 0; i < tokenslength; i++) {
      const vaultik1 = await market.listedTokens(BigInt(i));
      arr1.push(vaultik1);
    }
    setToken(arr1);
    let arr = [];
    const vaultlength = Number(await splitb.vaultId());
    for (let i = 0; i < vaultlength; i++) {
      const vault = await splitb.getVault(BigInt(i));

      if (vault[0].toLowerCase() == contract && vault[3] == BigInt(id)) {
        setMyVaultId(i);
      }

      if (vault[1].toLowerCase() === address) {
        setMyVault((myVault) => [...myVault, vault]);
      }
      arr.push(vault);
    }
    setAllVault(arr);
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
      {address ? (
        <>
          <div>
            <div className="flex flex-col items-center">
              <h2 className="pt-2 text-3xl text-white font-lalezar">
                ON WALLET
              </h2>
              <div className="bg-white w-11/12 h-0.5"></div>
            </div>
            <div className="min-h-[330px] flex pt-5 justify-center">
              <div>
                <section className="flex flex-wrap justify-center">
                  {NFTs ? (
                    NFTs.map((NFT) => {
                      return (
                        <div
                          className="transition delay-75 hover:-translate-y-1 hover:scale-105 hover:duration-75 flex flex-col items-center m-2"
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
                            className="greenbtn"
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
                      CONNECT WALLET!
                    </div>
                  )}
                </section>
              </div>
              <div>
                <section className="flex flex-wrap justify-center">
                  {NFTsOnMarket.map((NFT) => {
                    for (let i = 0; i < allVault.length; i++) {
                      if (
                        allVault[i][0].toLowerCase() == NFT.contract.address &&
                        allVault[i][3] == BigInt(NFT.id.tokenId)
                      ) {
                        return (
                          <div
                            className="transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover: duration-75 flex flex-col items-center m-2"
                            key={uuid()}
                          >
                            <ERC20Card
                              image={NFT.media[0].gateway}
                              title={NFT.title}
                              address={address}
                              tokenadr={allVault[i][7]}
                              count={Number(allVault[i][5])}
                              myVaultid={i}
                            ></ERC20Card>
                          </div>
                        );
                      }
                    }
                  })}
                </section>
              </div>
            </div>
          </div>
          {NFTsOnMarket ? (
            <>
              <div>
                <div className="flex flex-col items-center">
                  <h2 className="pt-2 text-3xl text-white font-lalezar">
                    ON MARKET
                  </h2>
                  <div className="bg-white w-11/12 h-0.5"></div>
                </div>

                <div className="min-h-[330px] flex pt-5 justify-center">
                  <div>
                    <section className="flex flex-wrap justify-center">
                      {NFTsOnMarket ? (
                        NFTsOnMarket.map((NFT) => {
                          for (let i = 0; i < myVault.length; i++) {
                            if (
                              myVault[i][0].toLowerCase() ==
                                NFT.contract.address &&
                              myVault[i][3] == BigInt(NFT.id.tokenId)
                            ) {
                              return (
                                <div
                                  className="mx-3 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover: duration-75 flex flex-col items-center m-2"
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
                                      className="redbtn mt-2"
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
                        <div className="text-white m-32 3xl font-lalezar flex justify-center"></div>
                      )}
                    </section>
                  </div>
                  <div>
                    <section className="flex flex-wrap justify-center">
                      {token.map((erc20, index) => {
                        for (let y = 0; y < NFTsOnMarket.length; y++) {
                          for (let x = 1; x < allVault.length; x++) {
                            if (
                              allVault[x][0].toLowerCase() ==
                                NFTsOnMarket[y].contract.address &&
                              allVault[x][3] ==
                                BigInt(NFTsOnMarket[y].id.tokenId)
                            ) {
                              if (erc20[0] == allVault[x][7]) {
                                return (
                                  <div
                                    className=" transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover: duration-150 flex flex-col items-center "
                                    key={uuid()}
                                  >
                                    <ERC20Card
                                      image={NFTsOnMarket[y].media[0].gateway}
                                      title={NFTsOnMarket[y].title}
                                      address={
                                        "0x47ca9D580EC559e725920B0a6F6729E487816232"
                                      }
                                      amount={erc20[4]}
                                      tokenadr={allVault[x][7]}
                                      count={Number(allVault[x][5])}
                                      tokenid={index}
                                      totalPrice={erc20[2]}
                                      seller={erc20[3]}
                                      myAddr={address}
                                      cansel={"cancelsell"}
                                    ></ERC20Card>
                                  </div>
                                );
                              }
                            }
                          }
                        }
                      })}
                    </section>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </>
      ) : (
        <h1 className="text-white flex justify-center items-center font-lalezar text-3xl h-full">
          CONNECT WALLET
        </h1>
      )}
    </>
  );
}

export default Profile;
