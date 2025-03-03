// nom avec majuscule : Prestation
//~ Import modules
import { CoreModel } from "../core/coreModel.js";
import { PrestationData } from "./repository.js";

class PrestationModel extends CoreModel {
  //& Properties
  data = PrestationData;
}

const Prestation = new PrestationModel();
export { Prestation };