import React from "react";

function Resale() {
  return (
    <>
      <div className="h-96 flex pl-16 pt-5">
        <div className="flex flex-col items-center h-96  ">
          <div className="h-64  flex items-center justify-center bg-white rounded-2xl m-3">
            <img className="h-60 m-3" src="/NFT_2.jpg"></img>
          </div>
          <div className="flex justify-between">
            <h2 className=" bg-prices font-lalezar rounded-full w-32 flex justify-center items-center">
              0,15 ETH
            </h2>
            <div className="w-5"> " " </div>
            <button className="violetbtn">BUY</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Resale;
