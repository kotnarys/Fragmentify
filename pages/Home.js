import React from 'react';

import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="flex  pl-52 pt-52 h-[910px]  bg-gradient-to-r  from-violet-300 to-fuchsia-300">
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
        <div className="flex flex-col items-center ">
          <div className="flex flex-col border-2 border-slate-400 items-center w-[450px] h-64 bg-violet-200 rounded-2xl ml-96">
            <h1 className="font-lalezar text-purple-500 text-center m-3 text-3xl ">
              FRAGMENTIFY
            </h1>
            <h2 className="font-lalezar  w-96 text-center  text-xl ">
              Immerse yourself in the world of unique NFT works – join our
              unique marketplace!
              <br />
              Have you seen a monkey or a whale being sold for $10,000? When
              splitting, you will be able to buy some of the works of art at a
              much lower price.
            </h2>
          </div>
          <Link
            className="rounded-xl font-lalezar w-40 h-10 text-center ml-96 mt-5 flex items-center justify-center hover:bg-blue-500 active:translate-y-1 bg-start-cyan text-white"
            href={"/Index"}
          >
            LET'S GO!
          </Link>
        </div>
      </div>
      <div className=" z-10 bottom-10 h-[54px] flex  text-3xl justify-center items-center text-white font-lalezar bg-slate-700">
        @kotnarys @cartlex @bubble777 @Serggoal @3TERRNITY
      </div>
    </>
  );
}