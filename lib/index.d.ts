import { IpfsFreeOptions, IpfsFreeConfig, IpfsFreeUploadFile, IpfsFreeDeleteFile, IfpsFreeResponse } from './types';
declare class IpfsFree {
    private config;
    private options;
    constructor(config: IpfsFreeConfig, options?: IpfsFreeOptions);
    private getUploadClinet;
    getDeleteClinet(url: string): Promise<void>;
    upload(file: IpfsFreeUploadFile): Promise<IfpsFreeResponse>;
    delete(options: IpfsFreeDeleteFile): Promise<void>;
}
export default IpfsFree;
