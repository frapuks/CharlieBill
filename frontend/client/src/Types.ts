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

export type Product = {
  id: number;
  name: string;
  price: number;
};

export type Client = {
  id: number;
  name: string;
  address: string;
};

export type Prestation = {
  id: number;
  clientId: number;
  productId: number;
  date: string;
  name: string;
  quantity: number;
  unit_price: number;
  total: number;
};