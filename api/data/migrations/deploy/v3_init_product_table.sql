BEGIN;

CREATE TABLE IF NOT EXISTS "product" (
  "id"              INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name"            TEXT NOT NULL,
  "price"           DECIMAL(10,2) NOT NULL,
  "created_at"      TIMESTAMPTZ NOT NULL DEFAULT now()
);

--~ Insert Demo's Data
INSERT INTO product (name, price) VALUES
  ('Effeuillage', 50.00),
  ('Pose de pavés', 120.00),
  ('Forage de puits', 300.00),
  ('Taille de haies', 70.00),
  ('Installation de clôture', 200.00),
  ('Nettoyage de terrasse', 80.00),
  ('Élagage d’arbres', 150.00),
  ('Aménagement de parterres', 180.00),
  ('Construction d’un muret', 250.00),
  ('Création d’un bassin', 400.00);

COMMIT;
