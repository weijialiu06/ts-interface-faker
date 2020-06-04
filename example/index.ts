const path = require('path');
import InterfaceFake from '../src/InterfaceFaker';
import { IPerson } from './test.interface';
const a = new InterfaceFake({
  'workRoot': path.resolve(__dirname, './')
});
const data: IPerson = a.getFakeData('IPerson');
console.log(JSON.stringify(data, null, 2));

export default {};
