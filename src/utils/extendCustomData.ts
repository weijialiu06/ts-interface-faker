const jsf = require('json-schema-faker');

// jsf.option({
//     alwaysFakeOptionals: true, 
//     fixedProbabilities: true
// });

const fakerData: {
  [type: string]: {
    data: any[];
    match: RegExp
  }
} = {
  'customData': {
    data: ['customData1', 'customData2'],
    match: /custom/
  }
};

// extend jsf data
Object.keys(fakerData).forEach(key => {
  jsf.format(key, () => getFakerData(key));
});

// function getMatchCustomKey(key: string): any {
//   for (let kv in fakerData) {
//     const customReg = fakerData[kv].match;
//     if (customReg.test(key)) {
//       return kv;
//     }
//   }
//   return false;
// }


function getFakerData(type: string): any[] {
  const datas = fakerData[type].data;
  const maxIndex = datas.length - 1;
  const randomIndex = Math.floor(Math.random() * maxIndex);
  return datas[randomIndex];
}

export default { jsf };
