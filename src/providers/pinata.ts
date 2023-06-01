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
        name: `${file.hash}${file.ext}`,
      },
      pinataOptions: {
        cidVersion: 1,
      },
    };
    // const readableStreamForFile = Readable.from(file.buffer as any);
    const _file: any = file;
    if (_file.buffer) {
      _file.stream = () => Readable.from(file.buffer as any);
      _file.name = `${_file.hash}${_file.ext}`;
    } else if (_file.stream) {
      const s = _file.stream;
      _file.name = `${_file.hash}${_file.ext}`;
      _file.stream = s;
    }
    const res = await this.client.pinFileToIPFS(_file.stream(), options);
    const cid = res.IpfsHash;
    return {
      url: `https://${cid}.ipfs.dweb.link?from=pinata`,
      cid,
    };
  }
  async delete(file: IpfsFreeDeleteFile) {
    if (file.url) {
      const cid = file.url.substring(
        file.url.indexOf('/') + 2,
        file.url.indexOf('.'),
      );
      const res = await this.client.unpin(cid);
      return Promise.resolve();
    }
  }
}
