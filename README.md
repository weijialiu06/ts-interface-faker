# ts-interface-faker

typescript interface mock/fake——基于 typescript 的 interface 结构创造假数据；支持 mockjs de '@语法'和'Random'方法

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
// get the fake data by using getFakeData
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

## 如何使用 mockjs

ts-interface-faker 本身依赖了 mockjs，你可以在项目中直接使用。目前仅支持 mockjs 的"@语法"和"Random"方法，尽管如此，这已经能覆盖到绝大部分的工作了。

```js
export interface IBook {
  name: '@ctitle';
  EnglishName: '《@sentence(2, 4)》';
  publishTime: `Random.date('yyyy-MM-dd')`; // use mockjs Random
  desc: '@csentence';
}
export interface IChild {
  isGirl: boolean;
  inSchool: '@boolean'; // use mockjs boolean
  booksList: IBook[];
}


export interface IPerson {
  age: '@integer(180, 60)'; // mockjs @integer
  name: '@name';
  cname: '@cname';
  birthday: `Random.datetime('yyyy-M-d H:m:s')`;
  photos: `Random.image('200x200', '#FF6600')`[];// use mockjs Random
  address: '@province(true)';
  children: IChild[];
}

const faker = new InterfaceFake({
  'workRoot': path.resolve(__dirname, './')
});
const data: IPerson = faker.getFakeData('IPerson');

```

**output**

```js
{
  "age": "102",
  "name": "Frank Hernandez",
  "cname": "袁勇",
  "birthday": "1985-9-28 8:39:51",
  "photos": [
    "http://dummyimage.com/200x200/FF6600",
    "http://dummyimage.com/200x200/FF6600"
  ],
  "address": "天津",
  "children": [
    {
      "isGirl": true,
      "inSchool": "false",
      "booksList": [
        {
          "name": "电根打你给研",
          "EnglishName": "《Bnounzzei hzdbxjg dzwdbtu xsdldr.》",
          "publishTime": "1974-12-16",
          "desc": "样声无们几报增装议两身后布多。"
        }
      ]
    },
    {
      "isGirl": true,
      "inSchool": "false",
      "booksList": [
        {
          "name": "命各期报",
          "EnglishName": "《Oxtt ewbnoy mxepwto ignbihb.》",
          "publishTime": "1999-01-28",
          "desc": "酸率易织国造江流前商商及为。"
        },
        {
          "name": "运一约与月常",
          "EnglishName": "《Pvnapzs hvfjxypn.》",
          "publishTime": "1975-05-01",
          "desc": "真酸队出厂我维质线约他直已局来石。"
        },
        {
          "name": "回公回任民",
          "EnglishName": "《Wcqgb too wqigie smjylqf.》",
          "publishTime": "2004-02-11",
          "desc": "去准中办义度斗按好例但结南得。"
        }
      ]
    },
    {
      "isGirl": false,
      "inSchool": "false",
      "booksList": [
        {
          "name": "效号作什论于低",
          "EnglishName": "《Lgip khjke qqhfiey.》",
          "publishTime": "1975-11-05",
          "desc": "电问意二北员话物声就备除劳列区太。"
        },
        {
          "name": "书入解品了每现",
          "EnglishName": "《Mtabweslx kcdg gtkhfpq oki.》",
          "publishTime": "1999-07-21",
          "desc": "龙金性各引南温万中每活层别些党委根。"
        }
      ]
    },
    {
      "isGirl": false,
      "inSchool": "false",
      "booksList": [
        {
          "name": "温平单率据",
          "EnglishName": "《Jmuen wtjwt eowfnbsjyn yltty.》",
          "publishTime": "1991-08-27",
          "desc": "斯张马处着节南青切问公响论。"
        },
        {
          "name": "白工许决",
          "EnglishName": "《Lvknl chfpfsm fjhhqawu.》",
          "publishTime": "1988-06-01",
          "desc": "年只基成但完第做八门书党。"
        },
        {
          "name": "约车般级",
          "EnglishName": "《Gkwjjzjj pgguphkpdu ljgovqny.》",
          "publishTime": "1992-12-21",
          "desc": "阶示术个然号内见系条根此并按深取。"
        },
        {
          "name": "例整包",
          "EnglishName": "《Nbdlwova wexjym.》",
          "publishTime": "1993-04-17",
          "desc": "布意在具复身叫支人律历特强所。"
        }
      ]
    }
  ]
}
```

[点击查看更多 mockjs 示例](http://mockjs.com/examples.html)

## Todo

- [x] 接入[mockjs](https://github.com/nuysoft/Mock.git)
