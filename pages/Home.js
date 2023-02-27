import React from "react";

export default function Home() {
  return (
    <>
      <div className="flex  pl-52 pt-52 h-screen bg-slate-100">
        <img
          className="absolute animate-up  w-[430px] h-[430px]"
          src="slicefoxup.png"
        />
        <img
          className="absolute animate-down w-[430px] h-[430px]"
          src="slicefoxdown.png"
        />

        <div>
          <img
            className="w-32 animate-left20 animation-delay-10 opacity-0 h-32 m-2"
            src="fullFox.png"
          />
          <img
            className="w-32 animate-left20 animation-delay-15 opacity-0 h-32 m-2"
            src="fullFox.png"
          />
          <img
            className="w-32 animate-left20 animation-delay-20 opacity-0 h-32 m-2"
            src="fullFox.png"
          />
        </div>
        <div>
          <img
            className="w-32 animate-left20 animation-delay-5 opacity-0 h-32 m-2"
            src="fullFox.png"
          />
          <img
            className="w-32 animate-left20 animation-delay-10 opacity-0 h-32 m-2"
            src="fullFox.png"
          />
          <img
            className="w-32 animate-left20 animation-delay-15 opacity-0 h-32 m-2"
            src="fullFox.png"
          />
        </div>
        <div>
          <img
            className="w-32  animate-left20 opacity-0 h-32 m-2"
            src="fullFox.png"
          />
          <img
            className="w-32 animate-left20 animation-delay-5 opacity-0 h-32 m-2"
            src="fullFox.png"
          />
          <img
            className="w-32 animate-left20 animation-delay-10 opacity-0 h-32 m-2"
            src="fullFox.png"
          />
        </div>
        <div className="flex flex-col  w-72 h-40 rounded-xl bg-violet-200 ml-96">
          <h1 className="font-lalezar text-purple-700 text-center text-3xl ">
            Fragmentify
          </h1>
          <h2 className="font-lalezar   text-center text-xl ">
            Here you can split your NFTs into several pieces and sell them
            <br /> or buy someone else's NFTs at low prices on our unique
            marketplace
          </h2>
        </div>
      </div>
    </>
  );
}
