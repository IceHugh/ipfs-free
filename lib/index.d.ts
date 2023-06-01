import { Provider, IpfsFreeOptions, IpfsFreeConfig, IpfsFreeFile, IpfsFreeDeleteFile, IfpsFreeResponse } from './types';
declare class IpfsFree {
    private config;
    private options;
    constructor(config: IpfsFreeConfig, options?: IpfsFreeOptions);
    private getUploadClinet;
    getProviderConfig(type: Provider): import("./types").AuthorizationKey | import("./types").AuthorizationS3 | import("./types").Authorization | undefined;
    getDeleteClinet(url: string): Promise<any>;
    upload({ buffer }: IpfsFreeFile): Promise<IfpsFreeResponse>;
    delete(options: IpfsFreeDeleteFile): Promise<void>;
}
export default IpfsFree;
