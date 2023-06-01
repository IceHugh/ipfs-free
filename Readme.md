# ipfs-free
ipfs-free aggregates multiple IPFS platform uploading SDKs into a single, easy to use package.
## Features
- Support uploading files to IPFS through Infura, Pinata, and more platforms
- Consistent API across different platforms
- Easy to switch between platforms
- Abstracts away the underlying complexity of each IPFS API
## Installation
```bash
npm install ipfs-free
```
## Usage
```js
import IpfsFree from 'ipfs-free';
const ipfsFree = new IpfsFree(
  {
    web3: [{
      token: <web3.storage token>,
    }],
    everland: [{
      key: '',
      secret: '',
      bucket: '',
    }],
    pinata: [{
      key: '',
      secret:
        '',
    }],
    lighthouse: [{
      token: '',
    }],
    filebase: [{
      key: '',
      secret: '',
      bucket: '',
    }],
    infura: [{
      key: '',
      secret: '',
    }],
  },
  { default: 'infura', random: true },
);
const { url, cid} = await ipfsFree.upload({
  hash: 'test',
  ext: '.txt',
  buffer: <file buffer>,
});
```
## options params

- default (Specify to select one of config provider)
- random (randomly choose one of config provider)

## Filebase Variable [ [tutorial](https://docs.filebase.com/configurations/third-party-configurations/backup-client-configurations/strapi-provider-plugin) ]


| Variable | Type   | Description            | Required |
|----------|--------|------------------------|----------|
| key      | string | Filebase access key    | yes      |
| secret   | string | Filebase access secret | yes      |
| bucket   | string | Filebase bucket name   | yes      |


## Pinata Variable

| Variable | Type   | Description          | Required |
|----------|--------|----------------------|----------|
| key      | string | Pinata access key    | yes      |
| secret   | string | Pinata access secret | yes      |

## 4Everland Variable

| Variable | Type   | Description             | Required |
|----------|--------|-------------------------|----------|
| key      | string | 4Everland access key    | yes      |
| secret   | string | 4Everland access secret | yes      |
| bucket   | string | 4Everland bucket name   | yes      |


## Web3 Variable

| Variable | Type   | Description            | Required |
|----------|--------|------------------------|----------|
| token    | string | Web3 Storage API Token | yes      |

## Lighthouse Variable

| Variable | Type   | Description                  | Required |
|----------|--------|------------------------------|----------|
| token    | string | Lighthouse Storage API Token | yes      |

## Links

- [IPFS website](https://ipfs.tech/)
- [Filebase website](https://filebase.com/)
- [Pinata website](https://pinata.cloud/)
- [4Everland website](https://dashboard.4everland.org/)
- [Web3 website](https://web3.storage/)
- [Lighthouse website](https://lighthouse.storage/)

---
## Contributing
We welcome contributions to ipfs-free! Feel free to open an issue or pull request to add new features, fix bugs, or improve documentation.
## License
MIT
This README covers the core highlights of your module including features, installation, usage, documentation, contributing guidelines and license. You can now use this as a starting point and modify it as needed to match your actual module. Let me know if you have any other questions! 