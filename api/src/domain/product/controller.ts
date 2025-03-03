//~ Import modules
import { Request, Response } from "express";
import debug from "debug";
const logger = debug("Controller");
import { CoreController } from "../core/coreController.js";
import { Product } from "./model.js";

class ProductController extends CoreController {
  model = Product;
  paramsId = "productId";
}

const product = new ProductController();
export { product };
