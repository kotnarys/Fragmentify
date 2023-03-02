import React, {
  useEffect,
  useState,
} from 'react';

import {
  BrowserProvider,
  formatEther,
} from 'ethers';
import uuid from 'react-uuid';

import split7 from '../../Contract/abi/splitContract/SplitContract';
import NftCard from '../../NFT/NftCard.jsx';
import handleClaimButtom from './ClaimButton';
import PurchaseButton from './PurchaseButton.js';

function Marketplace({ address, NFTsOnMarket }) {
  const [myVaultid, setMyVaultId] = useState();
  const [myVault, setMyVault] = useState([]);
  const [count, setCount] = useState();

  async function myVaults(id, contract) {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const splitb = split7.connect(signer);
    {
      const vaultlength = Number(await splitb.vaultId());
      for (let i = 1; i < vaultlength; i++) {
        const vault = await splitb.getVault(BigInt(i));
        if (vault[0].toLowerCase() == contract && vault[3] == BigInt(id)) {
          setMyVaultId(i);
        }

        setMyVault((myVault) => [...myVault, vault]);
      }
    }
  }

  useEffect(() => {
    if (myVaultid > 0) {
      handleClaimButtom(myVaultid);
    }
  }, [myVaultid]);

  useEffect(() => {
    myVaults();
  }, [address]);

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
                      return (
                        <div
                          className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover: duration-150 flex flex-col items-center "
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
                              <>{`PRICE: ${formatEther(myVault[i][2])} ETH`}</>
                            }
                          ></NftCard>
                          <div className="flex mt-2 ">
                            <PurchaseButton
                              price={myVault[i][2]}
                              myVaultid={i}
                              count={count}
                            />
                          </div>
                          <button
                            id="claimButton"
                            className="claimbtn w-52 mt-2"
                            onClick={(e) => {
                              if (e.target.id == "claimButton") {
                                myVaults(NFT.id.tokenId, NFT.contract.address);
                              }
                            }}
                          >
                            CLAIM
                          </button>
                        </div>
                      );
                    }
                  }
                })
              ) : (
                <div className="connectwalletbtn">
                  Connect Wallet
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Marketplace;
