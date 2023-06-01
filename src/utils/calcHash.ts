import ipfsOnlyHash from 'ipfs-only-hash';
export const calcCidV0 = async (file: any) => {
  const hash = await ipfsOnlyHash.of(file);
  return hash;
};
