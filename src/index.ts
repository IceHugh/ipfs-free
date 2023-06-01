import { getProvider } from './providers';
import {
  Provider,
  IpfsFreeOptions,
  IpfsFreeConfig,
  IpfsFreeFile,
  IpfsFreeDeleteFile,
  IfpsFreeResponse,
} from './types';
import { calcCidV0 } from './utils/calcHash';

class IpfsFree {
  private config: IpfsFreeConfig;
  private options: IpfsFreeOptions;
  // private clients = ['filebase', 'pinata', 'fleek', 'web3', 'lighthouse'];
  constructor(config: IpfsFreeConfig, options?: IpfsFreeOptions) {
    this.config = config;
    this.options = options || {};
  }
  private getUploadClinet() {
    const { default: type = 'filebase', random } = this.options;
    const currentConfigs = Object.keys(this.config) as Provider[];
    const firstType = this.config[type] ? type : currentConfigs[0];
    let clientType: Provider = firstType;
    if (random) {
      const index = Math.floor(Math.random() * currentConfigs.length);
      clientType = currentConfigs[index];
    }
    const Client = getProvider(clientType);
    const config = this.getProviderConfig(clientType);
    const client = new Client(config);
    return client;
  }
  getProviderConfig(type: Provider) {
    const config = this.config[type];
    let _config = config?.[0];
    const configLen = config?.length;
    if (configLen && configLen > 1) {
      const index = Math.floor(Math.random() * configLen);
      _config = config[index];
    }
    return _config;
  }
  async getDeleteClinet(url: string) {
    let types: Provider[] = [
      'filebase',
      'pinata',
      'fleek',
      'web3',
      'lighthouse',
      'everland',
    ];
    const type = types.find((item) => url.indexOf(item) > -1) || 'web3';
    const Client = getProvider(type);
    const config = this.getProviderConfig(type);
    const client = new Client(config);
    return client;
  }
  async upload({ buffer }: IpfsFreeFile): Promise<IfpsFreeResponse> {
    const client = this.getUploadClinet();
    const hash = await calcCidV0(buffer);
    const res = await client.upload({ hash, buffer });
    return res;
  }
  async delete(options: IpfsFreeDeleteFile) {
    if (!options.url) {
      throw new Error('url is required');
    }
    const client = await this.getDeleteClinet(options.url);
    await client.delete(options);
    return Promise.resolve();
  }
}

export default IpfsFree;
