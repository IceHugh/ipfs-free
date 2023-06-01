import lighthouse from '@lighthouse-web3/sdk';

import {
  IpfsFreeUploadFile,
  IpfsFreeDeleteFile,
  Authorization,
} from '../types';

export class Lighthouse {
  private config: Authorization;
  constructor(config: Authorization) {
    this.config = config;
  }
  async upload(file: IpfsFreeUploadFile) {
    const uploadResponse = await lighthouse.uploadBuffer(
      file.buffer,
      this.config.token,
    );
    const cid = uploadResponse.data.Hash;
    return {
      url: `https://gateway.lighthouse.storage/ipfs/${cid}?from=lighthouse`,
      cid,
    };
  }
  async delete(file: IpfsFreeDeleteFile) {
    return Promise.resolve();
  }
}
