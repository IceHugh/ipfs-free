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
    web3: {
      token: <web3.storage token>,
    },
    everland: {
      key: '',
      secret: '',
      bucket: '',
    },
    pinata: {
      key: '',
      secret:
        '',
    },
    lighthouse: {
      token: '',
    },
    filebase: {
      key: '',
      secret: '',
      bucket: '',
    },
    infura: {
      key: '',
      secret: '',
    },
  },
  { default: 'infura', random: true },
);
const { url, cid} = await ipfsFree.upload({
  hash: 'test',
  ext: '.txt',
  buffer: <file buffer>,
});
```
## Documentation
View the full documentation on the ipfs-free website.
## Contributing
We welcome contributions to ipfs-free! Feel free to open an issue or pull request to add new features, fix bugs, or improve documentation.
## License
MIT
This README covers the core highlights of your module including features, installation, usage, documentation, contributing guidelines and license. You can now use this as a starting point and modify it as needed to match your actual module. Let me know if you have any other questions! 