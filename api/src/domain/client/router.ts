//~ Import module
import { Router } from "express";
import { client } from "./controller.js";
import { validate } from "../../middlewares/validateSchema.js";
import { clientSchema, clientUpdateSchema } from "./schema.js";
import { validateToken } from "../../middlewares/validateToken.js";
import { admin, auth } from "../../middlewares/auth.js";
const router = Router();

//~ Routes
router.get("/api/v1/clients", client.fetchAll);
router.get("/api/v1/clients/:clientId(\\d+)", client.fetchOne);
router.post("/api/v1/clients", validate(clientSchema), client.create);
router.patch("/api/v1/clients/:clientId(\\d+)", [validateToken, auth, admin], validate(clientUpdateSchema), client.update);
router.delete("/api/v1/clients/:clientId(\\d+)", [validateToken, auth, admin], client.delete);

//~ Export router
export { router };