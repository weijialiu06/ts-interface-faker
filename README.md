# ts-interface-faker

typescript interface mock/fake——基于 typescript 的 interface 结构创造假数据；

generating fake data base on interface of typescript;

## Install

```
npm i ts-interface-faker --save
```

## Usage

```js
const path = require('path');
import InterfaceFake from 'ts-interface-faker';

const faker = new InterfaceFake({
  workRoot: path.resolve(__dirname, './'), // the base path to your workspace
});
// then get the fake data by getFakeData method
const data = faker.getFakeData((interfaceName: string));
```

## Demo

**typescript**

```js
const path = require('path');
import InterfaceFaker from 'ts-interface-faker';

interface IPerson {
  name: string;
  age: number;
  isMale: boolean;
  son: {
    name: string,
    age: number,
    isMale: boolean,
  };
}

const faker = new InterfaceFake({
  workRoot: path.resolve(__dirname, './'),
});

const data = faker.getFakeData('IPerson');
console.log(data);
```

**output**

```js
{ age: 7273430.9083658755,
  isMale: true,
  name: 'Duis labore sunt nisi sint',
  son:
   { age: 26279849.364269882,
     isMale: true,
     name: 'ad amet enim in' } }
```

## Todo

- [ ] 接入[mockjs](https://github.com/nuysoft/Mock.git)
- [ ] 自定义 mock 数据类型
