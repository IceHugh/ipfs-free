import { IpfsFreeUploadFile, IpfsFreeDeleteFile, AuthorizationKey } from '../types';
export declare class Pinata {
    private config;
    private client;
    constructor(config: AuthorizationKey);
    upload(file: IpfsFreeUploadFile): Promise<{
        url: string;
        cid: string;
    }>;
    delete(file: IpfsFreeDeleteFile): Promise<void>;
}
