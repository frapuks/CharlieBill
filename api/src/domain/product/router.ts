//~ Import module
import { Router } from "express";
import { product } from "./controller.js";
import { validate } from "../../middlewares/validateSchema.js";
import { productSchema, productUpdateSchema } from "./schema.js";
import { validateToken } from "../../middlewares/validateToken.js";
import { admin, auth } from "../../middlewares/auth.js";
const router = Router();

//~ Routes
router.get("/api/v1/products", product.fetchAll);
router.get("/api/v1/products/:productId(\\d+)", product.fetchOne);
router.post("/api/v1/products", validate(productSchema), product.create);
router.patch("/api/v1/products/:productId(\\d+)", [validateToken, auth, admin], validate(productUpdateSchema), product.update);
router.delete("/api/v1/products/:productId(\\d+)", [validateToken, auth, admin], product.delete);

//~ Export router
export { router };