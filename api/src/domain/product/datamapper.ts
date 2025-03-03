// Créer les fonctions SQL
//~ Import modules
import client from "../../config/databases/connect_pg.js";
import { PGCoreDataMapper } from "../core/coreDatamapper.js";

class PGProductDataMapper extends PGCoreDataMapper {
  tableName = "product";
  columns = ` "id", "name", "price"`;

  createFunctionName = "create_product";
  updateFunctionName = "update_product";
}

const PGProductData = new PGProductDataMapper(client);
export { PGProductData };