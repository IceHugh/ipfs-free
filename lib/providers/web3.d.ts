import { IpfsFreeUploadFile, IpfsFreeDeleteFile, Authorization } from '../types';
export declare class Web3 {
    private config;
    private client;
    private readonly endpoint;
    constructor(config: Authorization);
    upload(file: IpfsFreeUploadFile): Promise<{
        url: string;
        cid: import("web3.storage/dist/src/lib/interface").CIDString;
    }>;
    delete(file: IpfsFreeDeleteFile): Promise<void>;
}
