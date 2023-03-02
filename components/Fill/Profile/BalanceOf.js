import {
  BrowserProvider,
  Contract,
} from 'ethers';

import defaultProvider from '../../Contract/abi/defaultProvider.js';
import abi from '../../Contract/abi/marketToken/erc20abi.json';

async function BalanceOf(tokenAddress, address) {
  let balanceOf;
  const adr = tokenAddress;
  const erc20token = new Contract(adr, abi, defaultProvider);

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const token = erc20token.connect(signer);

  try {
    balanceOf = await token.balanceOf(address);
  } catch (error) {
    console.error(error);
  }

  return Number(balanceOf);
}

export default BalanceOf;
