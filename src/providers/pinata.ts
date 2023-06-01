import pinataSDK from '@pinata/sdk';
import { Readable } from 'stream';
import {
  IpfsFreeUploadFile,
  IpfsFreeDeleteFile,
  AuthorizationKey,
} from '../types';

export class Pinata {
  private config: AuthorizationKey;
  private client: pinataSDK;
  constructor(config: AuthorizationKey) {
    this.config = config;
    this.client = new pinataSDK(config.key, config.secret);
  }
  async upload(file: IpfsFreeUploadFile) {
    const options: any = {
      pinataMetadata: {
        name: file.hash,
      },
      pinataOptions: {
        cidVersion: 1,
      },
    };
    // const readableStreamForFile = Readable.from(file.buffer as any);
    const _file: any = file;
    if (_file.buffer) {
      _file.stream = () => Readable.from(file.buffer as any);
      _file.name = _file.hash;
    }
    const res = await this.client.pinFileToIPFS(_file.stream(), options);
    const cid = res.IpfsHash;
    return {
      url: `https://${cid}.ipfs.dweb.link?from=pinata`,
      cid,
    };
  }
  async delete(file: IpfsFreeDeleteFile) {
    const cid = file.hash;
    if (cid) {
      const res = await this.client.unpin(cid);
      return Promise.resolve();
    }
  }
}
