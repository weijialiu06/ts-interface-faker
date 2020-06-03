const path = require('path');
// @ts-ignore
import InterfaceFake from '../src/InterfaceFaker';

const a = new InterfaceFake({
  'workRoot': path.resolve(__dirname, './')
});

const data = a.getFakeData('IPerson');
console.log(data);

export default {};
