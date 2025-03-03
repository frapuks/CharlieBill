// Créer les fonctions SQL
//~ Import modules
import client from "../../config/databases/connect_pg.js";
import { PGCoreDataMapper } from "../core/coreDatamapper.js";

class PGClientDataMapper extends PGCoreDataMapper {
  tableName = "client";
  columns = ` "id", "name", "address"`;

  createFunctionName = "create_client";
  updateFunctionName = "update_client";
}

const PGClientData = new PGClientDataMapper(client);
export { PGClientData };