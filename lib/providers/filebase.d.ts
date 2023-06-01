import { IpfsFreeUploadFile, IpfsFreeDeleteFile, AuthorizationS3 } from '../types';
export declare class Filebase {
    private config;
    private client;
    private readonly endpoint;
    constructor(config: AuthorizationS3);
    upload(file: IpfsFreeUploadFile): Promise<{
        url: string;
        cid: string;
    }>;
    delete({ hash, ext }: IpfsFreeDeleteFile): Promise<void>;
}
