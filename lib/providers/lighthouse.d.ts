import { IpfsFreeUploadFile, IpfsFreeDeleteFile, Authorization } from '../types';
export declare class Lighthouse {
    private config;
    constructor(config: Authorization);
    upload(file: IpfsFreeUploadFile): Promise<{
        url: string;
        cid: any;
    }>;
    delete(file: IpfsFreeDeleteFile): Promise<void>;
}
