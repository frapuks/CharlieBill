export type User = {
  id?: number;
  username: string;
  email: string;
  password?: string;
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
};