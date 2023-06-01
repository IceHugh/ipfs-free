import { Web3 } from './web3';
import { Everland } from './everland';
import { Pinata } from './pinata';
import { Lighthouse } from './lighthouse';
import { Filebase } from './filebase';
import { Infura } from './infura';
import { Provider } from '../types';

export const getProvider = (type: Provider) => {
  const instances: any = {
    everland: Everland,
    web3: Web3,
    pinata: Pinata,
    lighthouse: Lighthouse,
    filebase: Filebase,
    infura: Infura,
  };
  return instances[type];
};
