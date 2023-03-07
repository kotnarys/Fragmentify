import React, { useEffect, useState } from "react";

import { BrowserProvider, formatEther } from "ethers";
import uuid from "react-uuid";

import split7 from "../../Contract/abi/splitContract/SplitContract";
import NftCard from "../../NFT/NftCard.jsx";
import handleClaimButtom from "./ClaimButton";
import PurchaseButton from "./PurchaseButton.js";

function Marketplace({ NFTsOnMarket }) {
  const [myVaultid, setMyVaultId] = useState();
  const [myVault, setMyVault] = useState([]);
  const [loader, setLoader] = useState(false);
  const [active, setActive] = useState(true);

  async function newVault() {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const splitb = split7.connect(signer);

    const vaultlength = Number(await splitb.vaultId());
    const arr = [];
    for (let i = 0; i < vaultlength; i++) {
      const vaultik = await splitb.getVault(BigInt(i));
      arr.push(vaultik);
    }
    setMyVault(arr);
  }

  async function myVaults(id, contract) {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const splitb = split7.connect(signer);
    {
      const vaultlength = Number(await splitb.vaultId());
      for (let i = 0; i < vaultlength; i++) {
        const vault = await splitb.getVault(BigInt(i));
        if (vault[0].toLowerCase() == contract && vault[3] == BigInt(id)) {
          setMyVaultId(i);
        }
      }
    }
  }

  useEffect(() => {
    if (myVaultid > 0) {
      handleClaimButtom(myVaultid);
    }
  }, [myVaultid]);

  useEffect(() => {
    (async () => {
      await newVault();
    })();
  }, []);

  return (
    <>
      <div>
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
                      if (myVault[i][4] != myVault[i][5]) {
                        return (
                          <div
                            className="transition ease-in-out delay-75 hover:scale-105 hover: duration-75 flex flex-col items-center"
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
                              price={
                                <>{`PRICE: ${formatEther(
                                  myVault[i][2]
                                )} ETH`}</>
                              }
                            ></NftCard>
                            <div className="flex mt-2">
                              <PurchaseButton
                                active={active}
                                setActive={setActive}
                                price={myVault[i][2]}
                                myVaultid={i}
                                loader={loader}
                                setLoader={setLoader}
                              />
                            </div>
                            <button
                              id="claimButton"
                              className="violetbtn"
                              onClick={(e) => {
                                if (e.target.id == "claimButton") {
                                  myVaults(
                                    NFT.id.tokenId,
                                    NFT.contract.address
                                  );
                                }
                              }}
                            >
                              CLAIM
                            </button>
                          </div>
                        );
                      }
                    }
                  }
                })
              ) : (
                <div> {null} </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Marketplace;
