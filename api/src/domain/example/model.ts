// nom avec majuscule : Fxample
//~ Import modules
import { CoreModel } from "../core/coreModel.js";
import { FxampleData } from "./repository.js";

class FxampleModel extends CoreModel {
  //& Properties
  data = FxampleData;
}

const Fxample = new FxampleModel();
export { Fxample };