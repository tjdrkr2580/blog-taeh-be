export class AuthDtoSignIn {
  userName: string;
  password: string;
}

export type AuthGenerateTokenDto = {
  id: string;
  userName: string;
};
