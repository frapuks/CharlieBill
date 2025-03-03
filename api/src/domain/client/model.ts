//~ Import modules
import { CoreModel } from "../core/coreModel.js";
import { ClientData } from "./repository.js";

class ClientModel extends CoreModel {
  //& Properties
  data = ClientData;
}

const Client = new ClientModel();
export { Client };