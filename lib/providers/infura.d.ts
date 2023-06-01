import { IpfsFreeUploadFile, IpfsFreeDeleteFile, AuthorizationKey } from '../types';
export declare class Infura {
    private config;
    constructor(config: AuthorizationKey);
    upload(file: IpfsFreeUploadFile): Promise<{
        url: string;
        cid: any;
    }>;
    delete(file: IpfsFreeDeleteFile): Promise<void>;
}
