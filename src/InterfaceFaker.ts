const globby = require('globby');
const TJS = require('typescript-json-schema');
const jsf = require('json-schema-faker');

export interface ISchemaProperty {
  type: string;
  properties: {
    [key: string]: {
      type: string;
    };
  };
  required: string[];
}

class InterfaceFake {
  private workRoot: string;
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
    // const formatedSchema = this.walkSchemaObj(schema);
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
    // const formatedSchema = walkSchemaObj(schema);
    // const result = fakeJsonSchema(formatedSchema);
    // return result;
  }
  private walkSchemaObj(schema: ISchemaProperty): any {
    for (let key in schema) {
      if (key === 'properties') {
        // 可选属性存在bug
        // https://github.com/json-schema-faker/json-schema-faker/issues/477
        const requiredKeys = Object.keys(schema[key]);
        schema['required'] = requiredKeys;
        // addFormatRules(schema[key]);
      } else {
        // @ts-ignore
        if (typeof schema[key] === 'object' && !(schema[key] instanceof Array)) {
          // @ts-ignore
          this.walkSchemaObj(schema[key]);
        }
      }
    }
    return schema;
  }
  private schema2FakeData(schema: ISchemaProperty): any {
    const result = jsf.generate(schema);
    return result;
  }
}


export default InterfaceFake;
