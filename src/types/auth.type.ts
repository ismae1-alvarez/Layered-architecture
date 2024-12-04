export interface AuthLogin {
  email: string;
  password: string;
}

export interface AuthType extends AuthLogin {
  name: string;
}

export interface AuthUpdate {
  name: string;
  email: string;
}

export interface Usuario {
  save(): unknown;
  _id: unknown;
  name: string;
  email: string;
}
