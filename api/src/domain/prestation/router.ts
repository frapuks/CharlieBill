// nom des routes avec un s : prestations
// nom : prestation
//~ Import module
import { Router } from "express";
import { prestation } from "./controller.js";
import { validate } from "../../middlewares/validateSchema.js";
import { prestationSchema, prestationUpdateSchema } from "./schema.js";
import { validateToken } from "../../middlewares/validateToken.js";
import { admin, auth } from "../../middlewares/auth.js";
const router = Router();

//~ Routes
router.get("/api/v1/prestations", prestation.fetchAll);
router.get("/api/v1/prestations/:prestationId(\\d+)", prestation.fetchOne);
router.post("/api/v1/prestations", validate(prestationSchema), prestation.create);
router.patch("/api/v1/prestations/:prestationId(\\d+)", [validateToken, auth, admin], validate(prestationUpdateSchema), prestation.update);
router.delete("/api/v1/prestations/:prestationId(\\d+)", [validateToken, auth, admin], prestation.delete);

//~ Export router
export { router };