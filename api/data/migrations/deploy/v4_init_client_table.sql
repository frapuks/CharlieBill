BEGIN;

CREATE TABLE IF NOT EXISTS "client" (
  "id"         INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name"       TEXT NOT NULL,
  "address"    TEXT NOT NULL
);

--~ Insert Demo's Data
INSERT INTO "client" (name, address) VALUES
  ('Jean Dupont', '12 rue des Lilas, 75015 Paris'),
  ('Marie Curie', '5 avenue de la République, 69003 Lyon'),
  ('Paul Martin', '8 boulevard Haussmann, 75008 Paris'),
  ('Sophie Bernard', '23 place Bellecour, 69002 Lyon'),
  ('Luc Durand', '14 rue des Acacias, 33000 Bordeaux'),
  ('Emma Lefevre', '7 allée des Tilleuls, 67000 Strasbourg'),
  ('Thomas Morel', '3 impasse des Cerisiers, 31000 Toulouse'),
  ('Isabelle Fontaine', '19 avenue Foch, 44000 Nantes'),
  ('Nicolas Lambert', '21 rue Saint-Michel, 35000 Rennes'),
  ('Claire Robert', '10 quai de la Loire, 45000 Orléans');

COMMIT;
