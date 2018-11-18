export interface User {
  uid: string;
  password: string;
  email: string;
  firstName?: string;
  lastName?: string;
  displayName: string;
  username: string;
  photoURL: string;
  roles: string;
  since: number;
  token?: string;
}
