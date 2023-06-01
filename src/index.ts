import { getProvider } from './providers';
import {
  Provider,
  IpfsFreeOptions,
  IpfsFreeProviders,
  IpfsFreeFile,
  IpfsFreeDeleteFile,
  IfpsFreeResponse,
} from './types';
import { calcCidV0 } from './utils/calcHash';

class IpfsFree {
  private providers: IpfsFreeProviders;
  private options: IpfsFreeOptions;
  // private clients = ['filebase', 'pinata', 'fleek', 'web3', 'lighthouse'];
  constructor(providers: IpfsFreeProviders, options?: IpfsFreeOptions) {
    this.providers = providers;
    this.options = options || {};
  }
  private getUploadClinet() {
    const { default: type = 'filebase', random } = this.options;
    const currentConfigs = Object.keys(this.providers) as Provider[];
    const providerType = this.providers[type] ? type : currentConfigs[0];
    let clientType: Provider = providerType;
    if (random) {
      const index = Math.floor(Math.random() * currentConfigs.length);
      clientType = currentConfigs[index];
    }
    const Client = getProvider(clientType);
    const providerConfig = this.getProviderConfig(clientType);
    const client = new Client(providerConfig);
    return client;
  }
  getProviderConfig(type: Provider) {
    const providerConfig = this.providers[type];
    let _providerConfig = providerConfig?.[0];
    const configLen = providerConfig?.length;
    if (configLen && configLen > 1) {
      const index = Math.floor(Math.random() * configLen);
      _providerConfig = providerConfig[index];
    }
    return _providerConfig;
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
    const proveiderConfig = this.getProviderConfig(type);
    const client = new Client(proveiderConfig);
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
