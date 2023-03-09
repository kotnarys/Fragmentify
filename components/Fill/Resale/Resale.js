import React, { useEffect, useState } from "react";

import { BrowserProvider } from "ethers";
import uuid from "react-uuid";

import marketContract from "../../Contract/abi/market/marketContract";
import split7 from "../../Contract/abi/splitContract/SplitContract";
import ERC20Card from "../../NFT/ERC20Card.jsx";

function Resale({ NFTsOnMarket }) {
  const [allVault, setAllVault] = useState([]);
  const [token, setToken] = useState([]);

  async function myVaults() {
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

    const vaultlength = Number(await splitb.vaultId());
    for (let i = 1; i < vaultlength; i++) {
      const vault = await splitb.getVault(BigInt(i));

      setAllVault((allVault) => [...allVault, vault]);
    }
  }

  useEffect(() => {
    myVaults();
  }, []);

  return (
    <>
      <>
        <div>
          <div className="min-h-[330px] flex pt-5 justify-center">
            <div>
              <section className="flex flex-wrap justify-center">
                {token.map((erc20, index) => {
                  for (let y = 0; y < NFTsOnMarket.length; y++) {
                    for (let x = 1; x < allVault.length; x++) {
                      if (
                        allVault[x][0].toLowerCase() ==
                          NFTsOnMarket[y].contract.address &&
                        allVault[x][3] == BigInt(NFTsOnMarket[y].id.tokenId)
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
                                  process.env.marketContract
                                }
                                amount={erc20[4]}
                                tokenadr={allVault[x][7]}
                                count={Number(allVault[x][5])}
                                tokenid={index}
                                totalPrice={erc20[2]}
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
    </>
  );
}

export default Resale;