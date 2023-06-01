import { S3 } from '@aws-sdk/client-s3';
import {
  IpfsFreeUploadFile,
  IpfsFreeDeleteFile,
  AuthorizationS3,
} from '../types';

export class Filebase {
  private config: AuthorizationS3;
  private client: S3;
  private readonly endpoint = 'https://s3.filebase.com';
  constructor(config: AuthorizationS3) {
    this.config = config;
    this.client = new S3({
      endpoint: this.endpoint,
      credentials: {
        accessKeyId: config.key,
        secretAccessKey: config.secret,
      },
      region: 'us-east-1',
    });
  }
  async upload(file: IpfsFreeUploadFile) {
    let params: any = {
      Bucket: this.config.bucket,
      Key: `${file.hash}${file.ext}`,
    };
    if (file.stream) {
      params.Body = file.stream;
    } else if (file.buffer) {
      params.Body = file.buffer;
    }
    await this.client.putObject(params);
    const { Metadata } = await this.client.headObject({
      Bucket: this.config.bucket,
      Key: `${file.hash}${file.ext}`,
    });
    if (!Metadata) {
      throw new Error('Upload failed');
    }
    const cid = Metadata['cid'];
    return {
      url: `https://${cid}.ipfs.cf-ipfs.com?from=firebase`,
      cid,
    };
  }
  async delete({ hash, ext }: IpfsFreeDeleteFile) {
    const params = {
      Bucket: this.config.bucket,
      Key: `${hash}${ext}`,
    };
    await this.client.deleteObject(params);
    return Promise.resolve();
  }
}
