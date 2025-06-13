export interface AuthUserFound {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  rol: string;
  roleVerification: string;
  userStatus: string;
  _doc?: Record<string, any>;
}
