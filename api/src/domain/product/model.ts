//~ Import modules
import { CoreModel } from "../core/coreModel.js";
import { ProductData } from "./repository.js";

class ProductModel extends CoreModel {
  //& Properties
  data = ProductData;
}

const Product = new ProductModel();
export { Product };