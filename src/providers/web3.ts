import { Readable } from 'stream';
import { Web3Storage } from 'web3.storage';

import {
  IpfsFreeUploadFile,
  IpfsFreeDeleteFile,
  Authorization,
} from '../types';

export class Web3 {
  private config: Authorization;
  private client: Web3Storage;
  private readonly endpoint = 'https://endpoint.4everland.co';
  constructor(config: Authorization) {
    this.config = config;
    this.client = new Web3Storage({ token: config.token });
  }
  async upload(file: IpfsFreeUploadFile) {
    const _file: any = file;
    if (_file.buffer) {
      _file.stream = () => Readable.from(file.buffer as any);
    }
    const cid = await this.client.put([_file as any], {
      name: _file.hash,
      wrapWithDirectory: false,
    });
    return {
      url: `https://${cid}.ipfs.dweb.link?from=web3`,
      cid,
    };
  }
  async delete(file: IpfsFreeDeleteFile) {
    return Promise.resolve();
  }
}
