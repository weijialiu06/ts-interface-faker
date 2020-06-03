export interface IPerson {
  name: string;
  age: number;
  isMale: boolean;
  son: {
    name: string;
    age: number;
    isMale: boolean;
  };
}
