export interface User {
  [x: string]: string;
}
export interface Auth {
  auth: {
    id: string;
    name: string;
    password: string;
    email: string;
    token: string;
  };
}
