import { useState } from "react";

const Explore = () => {
  const [owner, setOwner] = useState("");
  const [contractAddress, setContractAddress] = useState("");

  return (
    <div>
      <header className=" py-24  mb-12 w-full   alchemy">
        <div className="flex flex-col items-center mb-12">
          <div className="flex flex-col items-center justify-center mb-4 w-2/6 gap-y-2 ">
            <input
              className="border rounded-sm focus:outline-none py-2 px-3 w-full"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="Insert your wallet address"
            ></input>
            <input
              className="focus:outline-none rounded-sm py-2 px-3 w-full"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              placeholder="Insert NFT Contract address (optional)"
            ></input>
          </div>
          <div className="w-2/6 flex justify-center">
            <button
              className="py-3 bg-white rounded-sm w-full hover:bg-slate-100"
              onClick={() => {}}
            >
              Search
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Explore;
