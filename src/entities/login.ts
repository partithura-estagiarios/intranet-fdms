export interface User {
  labelInputName: string;
  labelEmail: string;
  labelInputPassword: string;
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
