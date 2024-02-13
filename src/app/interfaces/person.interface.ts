export interface Person {
  _id: string;
  isActive: boolean;
  balance?: string;
  picture: string;
  age: number;
  name?: Name
  company?: string;
  email?: string;
  address: string;
  tags: string[];
  favoriteFruit: string;
  [key: string]: any;
}
export interface Name {
  first: string;
  last?: string;
  [key: string]: any;
}
