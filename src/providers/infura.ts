import { Readable } from 'stream';
import axios from 'axios';
import {
  IpfsFreeUploadFile,
  IpfsFreeDeleteFile,
  AuthorizationKey,
} from '../types';

export class Infura {
  private config: AuthorizationKey;
  constructor(config: AuthorizationKey) {
    this.config = config;
  }
  async upload(file: IpfsFreeUploadFile) {
    const _file: any = file;
    if (_file.buffer) {
      _file.stream = () => Readable.from(file.buffer as any);
    } else if (_file.stream) {
      const s = _file.stream;
      _file.name = `${_file.hash}${_file.ext}`;
      _file.stream = s;
    }
    const form_data = new URLSearchParams();
    form_data.append('file', _file.stream());
    const res = await axios.post(
      'https://ipfs.infura.io:5001/api/v0/add',
      form_data,
      {
        headers: {
          Authorization: `Basic ${btoa(
            this.config.key + ':' + this.config.secret,
          )}`,
        },
      },
    );
    const cid = res.data.Hash;
    return {
      url: `https://${cid}.ipfs.w3s.link?from=web3`,
      cid,
    };
  }
  async delete(file: IpfsFreeDeleteFile) {
    return Promise.resolve();
  }
}
