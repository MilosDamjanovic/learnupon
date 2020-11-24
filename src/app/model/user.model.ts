export interface User {
  username: string;
  password: string;
  language: string;
  email: string;
  last_name: string;
  first_name: string;
}

export interface UserReq {
  User: User;
}
