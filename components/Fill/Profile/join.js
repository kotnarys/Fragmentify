import {
    BrowserProvider,
    Contract,
    InfuraProvider,
} from 'ethers';

import contractAbi from '../../Contract/abi/marketToken/erc20abi.json';
import split7 from '../../Contract/abi/splitContract/SplitContract';

async function handleJoin(myVaultid, balance, tokenadr) {
  console.log(balance);

  const defaultProvider = new InfuraProvider("goerli");

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const erc20 = new Contract(tokenadr, contractAbi, defaultProvider);
  const erc20token = erc20.connect(signer);
  const splitb = split7.connect(signer);

  try {
    const aprove = await erc20token.approve(
      "0xcf02e7843de8E0d25858b5736494B2af1c679E33",
      BigInt(balance)
    );
    await aprove.wait();
    await splitb.join(BigInt(myVaultid));
  } catch (error) {
    console.error(error);
  }
}

export default handleJoin;
