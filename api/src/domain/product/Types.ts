// Modifier le nom des colonnes
export type Product = {
  id?: number;
  name: string;
  price: number;
};

export interface ProductSchema {
  name: string;
  price: number;
}