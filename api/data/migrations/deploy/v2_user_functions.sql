BEGIN;

--& Function Create user
CREATE OR REPLACE FUNCTION create_user(json) RETURNS TABLE (inserted_user TEXT) AS $$
  BEGIN
  INSERT INTO "user" ("username", "email", "password")
  VALUES (
    ($1 ->> 'username')::TEXT,
    ($1 ->> 'email')::EMAIL,
    ($1 ->> 'password')::PWD
  );
  RETURN QUERY (
    SELECT "user".username
    FROM "user"
    ORDER BY "user".id DESC LIMIT 1
  );
  END
$$ LANGUAGE plpgsql VOLATILE;

--& User Identity
CREATE TYPE identity AS (
  "id" INT,
  "username" VARCHAR(50),
  "email" EMAIL,
  "password" PWD,
  "role" TEXT
);

--& Function User Identity
CREATE OR REPLACE FUNCTION user_identity(user_name TEXT, email_address EMAIL) RETURNS SETOF identity AS $$
  BEGIN 
  RETURN QUERY (
    SELECT
      U."id",
      U."username",
      U."email",
      U."password",
      R."label" AS role
    FROM "role" AS R
    JOIN "user" AS U ON R."id" = U."role_id"
    WHERE U."email" = email_address :: EMAIL
    OR U."username" = user_name
  );
  END 
$$ LANGUAGE plpgsql VOLATILE;

--& Function Update user
CREATE OR REPLACE FUNCTION update_user(json) RETURNS TABLE (updated_user VARCHAR(50)) AS $$
  BEGIN
  UPDATE "user" AS U
  SET
      "role_id" = COALESCE(($1 ->> 'role_id')::INTEGER, role_id),
      "username" = COALESCE(($1 ->> 'username')::VARCHAR(50), "username"),
      "first_name" = COALESCE(($1 ->> 'first_name')::VARCHAR(50), "first_name"),
      "last_name" = COALESCE(($1 ->> 'last_name')::VARCHAR(50), "last_name"),
      "email" = COALESCE(($1 ->> 'email')::EMAIL, "email"),
      "password" = COALESCE(($1 ->> 'password')::PWD,  "password")
  WHERE U."id" = ($1->> 'id')::INT;
  RETURN QUERY (
    SELECT U.username 
    FROM "user" AS U
    WHERE U.id = ($1->> 'id')::INT
  );
  END
$$ LANGUAGE plpgsql VOLATILE;

COMMIT;