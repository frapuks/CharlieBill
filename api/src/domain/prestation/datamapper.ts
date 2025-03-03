// Créer les fonctions SQL
//~ Import modules
import client from "../../config/databases/connect_pg.js";
import { PGCoreDataMapper } from "../core/coreDatamapper.js";

class PGPrestationDataMapper extends PGCoreDataMapper {
  tableName = "prestation";
  columns = ` "id", "clientId", "productId", "date", "name", "quantity", "unit_price", "total"`;

  createFunctionName = "create_prestation";
  updateFunctionName = "update_prestation";
}

const PGPrestationData = new PGPrestationDataMapper(client);
export { PGPrestationData };