import { Provider, IpfsFreeOptions, IpfsFreeProviders, IpfsFreeFile, IpfsFreeDeleteFile, IfpsFreeResponse } from './types';
declare class IpfsFree {
    private providers;
    private options;
    constructor(providers: IpfsFreeProviders, options?: IpfsFreeOptions);
    private getUploadClinet;
    getProviderConfig(type: Provider): import("./types").AuthorizationKey | import("./types").AuthorizationS3 | import("./types").Authorization | undefined;
    getDeleteClinet(url: string): Promise<any>;
    upload({ buffer }: IpfsFreeFile): Promise<IfpsFreeResponse>;
    delete(options: IpfsFreeDeleteFile): Promise<void>;
}
export default IpfsFree;
