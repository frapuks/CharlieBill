// nom avec majuscule : Fxample
// nom sans majuscule : example
// ajouter le nom des columns : COLS
// Créer les fonctions SQL
//~ Import modules
import client from "../../config/databases/connect_pg.js";
import { PGCoreDataMapper } from "../core/coreDatamapper.js";

class PGFxampleDataMapper extends PGCoreDataMapper {
  tableName = "example";
  columns = ` "id", COLS`;

  createFunctionName = "create_example";
  updateFunctionName = "update_example";
}

const PGFxampleData = new PGFxampleDataMapper(client);
export { PGFxampleData };