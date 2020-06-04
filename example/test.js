const obj2 = {
  type: 'object',
  properties: {
    list: {
      type: 'array',
      items: {
        $ref: '#/definitions/IMock',
      },
    },
    name: {
      type: 'string',
    },
  },
  required: ['list', 'name'],
  definitions: {
    IMock: {
      type: 'object',
      properties: {
        tic: {
          type: 'string',
          enum: ['Random.range(1, 10, 2)'],
        },
        color: {
          type: 'string',
          enum: ['@rgba'],
        },
        num: {
          type: 'string',
          enum: ['@float'],
        },
        name: {
          type: 'string',
          enum: ['@cname'],
        },
        age: {
          type: 'string',
          enum: ['@integer(30, 100)'],
        },
        photo: {
          type: 'string',
          enum: ["Random.image('200x200', '#FF6600')"],
        },
        sex: {
          type: 'string',
          enum: ['@cname'],
        },
        birthday: {
          type: 'array',
          items: {
            type: 'string',
            enum: ["Random.datetime('Y-M-d H:m:s')"],
          },
        },
        address: {
          type: 'string',
          enum: ['@province(true)'],
        },
        gogo: {
          type: 'string',
          enum: ['Random.cfirst()'],
        },
        avatar: {
          type: 'string',
          enum: ['@iamge'],
        },
        test: {
          type: 'string',
          enum: ['@cword("零一二三四五六七八九十", 8)'],
        },
        son: {
          type: 'object',
          properties: {
            sonName: {
              type: 'string',
              enum: ['@cname'],
            },
            age: {
              type: 'string',
              enum: ['@integer(30, 100)'],
            },
            isMale: {
              type: 'string',
              enum: ['@boolean'],
            },
          },
          required: ['age', 'isMale', 'sonName'],
        },
        books: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                enum: ['@cname'],
              },
              times: {
                type: 'string',
                enum: ['@integer(300, 1000)'],
              },
              desc: {
                type: 'string',
                enum: ['@csentence(5)'],
              },
            },
            required: ['desc', 'name', 'times'],
          },
        },
      },
      required: [
        'address',
        'age',
        'avatar',
        'birthday',
        'books',
        'color',
        'gogo',
        'name',
        'num',
        'photo',
        'sex',
        'son',
        'test',
        'tic',
      ],
    },
  },
  $schema: 'http://json-schema.org/draft-07/schema#',
};

function parseDefinitions(properties) {
  const keys = Object.keys(properties);

  keys.forEach((key) => {
    const value = properties[key];
    const type = value.type;
    const ref = value.$ref;
    if (ref) {
      const realData = getDefinition(value.$ref);
      properties[key] = realData;
    } else if (type) {
      if (type === 'object') {
        // parseDefinitions(value);
      }
      if (type === 'array') {
        // value.items.forEach((item) => {
        //   parseDefinitions(item);
        // });
      }
    }
  });
}

function parseProperties(properties) {
  const keys = Object.keys(properties);
  keys.forEach((key) => {
    const value = properties[key];
    const ref = value.$ref;
    const type = value.type;
    if (ref) {
      const realData = getDefinition(value.$ref);
      properties[key] = realData;
    } else if (type == 'object' || type == 'array') {
      parseDefinitions(value);
    }
  });
}

function getDefinition(ref) {
  const arr = ref.split('/');
  const key = arr[arr.length - 1];
  return obj2.definitions[key];
}

Object.keys(obj2.definitions).forEach((key) => {
  parseDefinitions(obj2.definitions[key]);
});

parseProperties(obj2.properties);

console.log(JSON.stringify(obj2, null, 2));
