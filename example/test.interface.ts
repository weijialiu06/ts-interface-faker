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

