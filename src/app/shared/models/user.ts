export interface User {
  uid: string;
  password: string;
  email: string;
  firstName?: string;
  lastName?: string;
  displayName: string;
  username: string;
  photoURL: string;
  roles: Roles;
  since: number;
  token?: string;
}

export class Roles {
  subscriber?: boolean = false;
  developer?: boolean = false;
  admin?: boolean = false;
}