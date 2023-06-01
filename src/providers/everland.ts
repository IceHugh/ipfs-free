import { S3 } from '@aws-sdk/client-s3';
import {
  IpfsFreeUploadFile,
  IpfsFreeDeleteFile,
  AuthorizationS3,
} from '../types';

export class Everland {
  private config: AuthorizationS3;
  private client: S3;
  private readonly endpoint = 'https://endpoint.4everland.co';
  constructor(config: AuthorizationS3) {
    this.config = config;
    this.client = new S3({
      endpoint: this.endpoint,
      credentials: {
        accessKeyId: config.key,
        secretAccessKey: config.secret,
      },
      region: 'us-west-2',
    });
  }
  async upload(file: IpfsFreeUploadFile) {
    let params: any = {
      Bucket: this.config.bucket,
      Key: file.hash,
      Body: file.buffer,
    };

    await this.client.putObject(params);
    const { Metadata } = await this.client.headObject({
      Bucket: this.config.bucket,
      Key: file.hash,
    });
    if (!Metadata) {
      throw new Error('Upload failed');
    }
    const cid = Metadata['ipfs-hash'];
    return {
      url: `https://${cid}.ipfs.dweb.link?from=4everland`,
      cid,
    };
  }
  async delete({ hash }: IpfsFreeDeleteFile) {
    const params = {
      Bucket: this.config.bucket,
      Key:  hash,
    };
    await this.client.deleteObject(params);
    return Promise.resolve();
  }
}
