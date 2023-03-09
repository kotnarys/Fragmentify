import { BrowserProvider } from 'ethers';

import split7 from '../../Contract/abi/splitContract/SplitContract';

async function handleJoinClick(myVaultid) {
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const splitb = split7.connect(signer);

  try {
    await splitb.join(myVaultid);
  } catch (error) {
    console.error(error);
  }
}

export default handleJoinClick;