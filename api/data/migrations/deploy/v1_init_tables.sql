BEGIN;

--~ Create domains

--& Check email
CREATE DOMAIN EMAIL AS TEXT CHECK (
    VALUE ~ '^(?#email)[-a-zA-Z0-9.-_]+@[\w-]+(?:\.[\w-]{2,4})$'
);

--& Check password
-- Minimum 8 characters - at least 1 number, one min, one maj, un one special character min
CREATE DOMAIN PWD AS TEXT CHECK (
    VALUE ~ '^(?#password)(?=.*[0-9])(?=.*[-a-z])(?=.*[-A-Z])(?=.*[^a-zA-Z0-9]).{8,}$'
);

--~ Create tables
CREATE TABLE IF NOT EXISTS "role" (
  "id"    INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "label" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "user" (
    "id"          INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "role_id"     INTEGER NOT NULL DEFAULT 2,
    "username"    VARCHAR(50) NOT NULL UNIQUE,
    "first_name"  VARCHAR(50),
    "last_name"   VARCHAR(50),
    "email"       EMAIL NOT NULL UNIQUE,
    "password"    PWD NOT NULL
);
ALTER TABLE "user" ADD FOREIGN KEY (role_id) REFERENCES "role" (id);

--~ Insert Demo's Data
INSERT INTO "role" (label) VALUES
  ('admin'),
  ('user');

-- user admin and password 'admin' ONLY FOR TEST ! Please create new user to use this app
INSERT INTO "user" (username, email, password, role_id) VALUES
  ('admin', 'admin@admin.com', '$2b$10$.Ng8WbQie6g/aSFzUXJJnuCOc1ot8gsta2/GU/OUcbfX95KJI9iUS', 1);

COMMIT;