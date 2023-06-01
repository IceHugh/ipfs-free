import fs from 'fs';
import { calcCidV0 } from './src/utils/calcHash';
const buff = fs.readFileSync('test.txt');
const main = async () => {
  console.log(await calcCidV0(buff));
};

main();
