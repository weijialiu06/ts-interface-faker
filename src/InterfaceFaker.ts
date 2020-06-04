import Utils from './utils/Utils';

const globby = require('globby');
const TJS = require('typescript-json-schema');
const jsf = require('json-schema-faker');
const MOCK_JS = require('mockjs');

export interface ISchemaProperty {
  type: string;
  definitions?: any;
  properties: {
    [key: string]: {
      type: string;
      format: string;
      $ref?: string;
      enum?: any;
      mockRule?: any;
    };
  };
  required: string[];
}

class InterfaceFake {
  private workRoot: string;
  private targetSchema: any;
  constructor(config: {
    workRoot: string;
  }) {
    this.workRoot = config.workRoot;
  }
  public getTsFiles(): string[] {
    const result: string[] = globby.sync([`${this.workRoot}/**/*.ts`]);
    return result;
  }
  public getFakeData(interfaceType: string): any {
    const schema = this.getSchemaProperties(interfaceType);
    this.targetSchema = schema;
    // 解决循环套用自定义结构的Definition引用问题
    Object.keys(schema.definitions).forEach((key) => {
      this.parseSchemaDefinitions(schema.definitions[key].properties);
    });

    this.parseSchemaProperties(schema);

    // console.log(JSON.stringify(schema, null, 2));

    this.walkSchemaObj(schema);
    const result = this.schema2FakeData(schema);
    return result;
  }

  private getSchemaProperties(interfaceName: string): ISchemaProperty {
    const tsFiles = this.getTsFiles();
    const program = TJS.getProgramFromFiles(tsFiles);
    const settings = {
      required: true,
      ignoreErrors: true,
    };
    const properties: ISchemaProperty = TJS.generateSchema(program, interfaceName, settings);
    return properties;
  }
  private walkSchemaObj(schema: ISchemaProperty): any {
    if (schema['properties']) {
      // 可选属性存在bug
      // https://github.com/json-schema-faker/json-schema-faker/issues/477
      const requiredKeys = Object.keys(schema['properties']);
      schema['required'] = requiredKeys;
      Object.keys(schema.properties).forEach((k: string) => {
        if (schema.properties[k].type === 'object') {
          // @ts-ignore
          this.walkSchemaObj(schema.properties[k]);
        } else if (schema.properties[k].type === 'array') {
          // @ts-ignore
          this.walkSchemaObj(schema.properties[k].items);
        } else {
          if (schema.properties[k].enum && schema.properties[k].enum.length > 0) {
            schema.properties[k].mockRule = schema.properties[k].enum[0];
            schema.properties[k].format = schema.properties[k].mockRule;
            delete schema.properties[k].enum;
            this.addMockjsFormat(schema.properties[k]);
          }
        }
      });
    } else {
      // @ts-ignore
      if (schema.enum && schema.enum.length > 0) {
        // @ts-ignore
        schema.mockRule = schema.enum[0];
        // @ts-ignore
        schema.format = schema.mockRule;
        // @ts-ignore
        delete schema.enum;
        this.addMockjsFormat(schema);
      }
    }
    // }
    return schema;
  }
  private schema2FakeData(schema: ISchemaProperty): any {
    const result = jsf.generate(schema);
    return result;
  }
  private addMockjsFormat(schema: any): void {
    jsf.format(schema.mockRule, () => {
      let data: any;
      try {
        const dataObj = JSON.parse(schema.mockRule);
        const obj = MOCK_JS.mock(dataObj);
        const key = Object.keys(dataObj)[0];
        data = obj[key]; // JSON.stringify(obj[key]);
        // console.log(data);
      } catch (e) {
        data = MOCK_JS.mock(schema.mockRule);
        if (schema.mockRule.indexOf('Random') === 0) {
          data = eval(`MOCK_JS.${schema.mockRule}`);
        }
      }
      return data;
    });
  }


  private parseSchemaDefinitions(properties: any): void {
    const keys = Object.keys(properties);
    keys.forEach((key) => {
      const value = properties[key];
      const ref = value.$ref;
      const type = value.type;
      if (ref) {
        const realData = this.getSchemaDefinition(value.$ref);
        properties[key] = realData;
      } else {
        if (type === 'array') {
          this.parseSchemaDefinitions(value);
        }
      }
    });
  }

  private parseSchemaProperties(schema: any): void {
    const { properties } = schema;
    const keys = Object.keys(properties);
    keys.forEach((key) => {
      const value = properties[key];
      const ref = value.$ref;
      const type = value.type;
      if (ref) {
        const realData = this.getSchemaDefinition(value.$ref);
        properties[key] = realData;
      } else if (type === 'object' || type === 'array') {
        this.parseSchemaDefinitions(value);
      }
    });
  }

  private getSchemaDefinition(ref: string): any {
    const arr = ref.split('/');
    const key = arr[arr.length - 1];
    return this.targetSchema.definitions[key];
  }
}

export default InterfaceFake;
