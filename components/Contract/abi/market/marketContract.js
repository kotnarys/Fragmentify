import { Contract } from "ethers";

import defaultProvider from "../defaultProvider";

const abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "contract NFTShare",
        name: "tokenContract",
        type: "address",
      },
    ],
    name: "tokenAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract NFTShare",
        name: "tokenContract",
        type: "address",
      },
    ],
    name: "tokenBought",
    type: "event",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_tokenCount", type: "uint256" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "_getTotalPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_price", type: "uint256" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
      {
        internalType: "contract NFTShare",
        name: "_tokenContract",
        type: "address",
      },
    ],
    name: "addTokenToShop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract NFTShare",
        name: "_tokenContract",
        type: "address",
      },
      { internalType: "uint256", name: "_tokenID", type: "uint256" },
    ],
    name: "buyToken",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_feePercent", type: "uint256" }],
    name: "changeMarketlaceFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "feePercent",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "listedTokens",
    outputs: [
      {
        internalType: "contract NFTShare",
        name: "tokenContract",
        type: "address",
      },
      { internalType: "uint256", name: "price", type: "uint256" },
      { internalType: "uint256", name: "totalPrice", type: "uint256" },
      { internalType: "address", name: "seller", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_tokenID", type: "uint256" },
      {
        internalType: "contract NFTShare",
        name: "_tokenContract",
        type: "address",
      },
    ],
    name: "removeTokenFromShop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "value",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const marketContract = new Contract(process.env.marketContract, abi, defaultProvider);

export default marketContract;
