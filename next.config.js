/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    networkName: "goerli",
    marketContract: "0x47ca9D580EC559e725920B0a6F6729E487816232",
    splitContract: "0xcf02e7843de8E0d25858b5736494B2af1c679E33",
    nftContract: "0xaa482f1AA0Fb90eD0260d77fD86996b818e2d572",
    marketToken: "0xAeFF09e2649221E32F5465E2786495bE4eDa580a",
    uri: "QmS5doNV9CuxMtWS6cWgTuogv97TtXi91t9Exk42V5GaXh ",
    apiKey: "sKaPjjjxG03aHv0sJPVMc0HeqYNI6iC2",
  },
};

module.exports = nextConfig;
