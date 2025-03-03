// Modifier le nom des colonnes
export type Prestation = {
  id?: number;
  clientId: number;
  productId: number;
  date: string;
  name: string;
  quantity: number;
  unit_price: number;
  total: number;
};

export interface PrestationSchema {
  clientId: number;
  productId: number;
  date: string;
  name: string;
  quantity: number;
  unit_price: number;
  total: number;
}
