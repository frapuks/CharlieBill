// nom des routes avec un s : axamples
// nom : example
//~ Import module
import { Router } from "express";
import { example } from "./controller.js";
import { validate } from "../../middlewares/validateSchema.js";
import { exampleSchema, exampleUpdateSchema } from "./schema.js";
import { validateToken } from "../../middlewares/validateToken.js";
import { admin, auth } from "../../middlewares/auth.js";
const router = Router();

//~ Routes
router.get("/api/v1/axamples", example.fetchAll);
router.get("/api/v1/axamples/:exampleId(\\d+)", example.fetchOne);
router.post("/api/v1/axamples", validate(exampleSchema), example.create);
router.patch("/api/v1/axamples/:exampleId(\\d+)", [validateToken, auth, admin], validate(exampleUpdateSchema), example.update);
router.delete("/api/v1/axamples/:exampleId(\\d+)", [validateToken, auth, admin], example.delete);

//~ Export router
export { router };