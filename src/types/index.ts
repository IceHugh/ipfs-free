import { Readable } from 'stream';

export interface IpfsFreeUploadFile {
  hash: string;
  ext: string;
  stream?: () => Readable;
  buffer?: Buffer;
}

export interface IpfsFreeDeleteFile {
  hash: string;
  ext: string;
  url: string;
}

export interface AuthorizationKey {
  key: string;
  secret: string;
}
export interface AuthorizationS3 extends AuthorizationKey {
  bucket: string;
}
export interface Authorization {
  token: string;
}
export interface IpfsFreeConfig {
  filebase?: AuthorizationS3[];
  everland?: AuthorizationS3[];
  pinata?: AuthorizationKey[];
  fleek?: AuthorizationS3[];
  web3?: Authorization[];
  lighthouse?: Authorization[];
  infura?: AuthorizationKey[];
}
export type Provider = keyof IpfsFreeConfig;
export interface IpfsFreeOptions {
  default?: Provider;
  random?: boolean;
}

export interface IfpsFreeResponse {
  cid: string;
  url: string;
}
