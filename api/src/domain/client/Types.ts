// Modifier le nom des colonnes
export type Client = {
  id?: number;
  name: string;
  address: string;
};

export interface ClientSchema {
  name: string;
  address: string;
}
