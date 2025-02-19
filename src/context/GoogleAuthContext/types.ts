export interface GoogleAuthContextType {
  isAdmin: boolean;
  isScriptLoaded: boolean;
}

export interface GoogleLoginCallbackParamType {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
}

export interface GoogleLoginCredentialJWTDecodedType {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
}
