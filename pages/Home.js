import React from "react";

import Link from "next/link";

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
        <div className="flex flex-col  items-center w-96 h-48 rounded-3xl bg-violet-200 ml-96">
          <h1 className="font-lalezar text-purple-700 text-center m-3 text-3xl ">
            Fragmentify
          </h1>
          <h2 className="font-lalezar w-72 text-center text-xl ">
            Here you can split your NFTs into several pieces and sell them
            <br /> or buy someone else's NFTs at low prices on our unique
            marketplace
          </h2>
        </div>
        <Link
          className="rounded-3xl w-40 h-10 text-center flex items-center justify-center hover:bg-slate-700 active:translate-y-1 bg-black text-white"
          href={"/Index"}
        >
          START
        </Link>
      </div>
    </>
  );
}
