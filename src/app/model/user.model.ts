export interface User {
  username: string;
  password: string;
  language: string;
  email: string;
  last_name: string;
  first_name: string;
  id: number;
  sign_in_count: number;
  number_of_enrollments: number;
  number_of_enrollments_accessed: number;
}

export interface UserItemResponse {
  email: string;
  last_name: string;
  first_name: string;
  id: number;
  isSelected: boolean; // client side property
  sign_in_count: number;
  number_of_enrollments: number;
  number_of_enrollments_accessed: number;
}


export interface UserReq {
  User: User;
}
