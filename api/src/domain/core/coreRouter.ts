//~ Import modules
import { Router } from "express";
const router = Router();

//~ Main
import { router as mainRouter } from "../main/router.js";
router.use(mainRouter);

//~ User
import { router as userRouter } from "../user/router.js";
router.use(userRouter);

//~ User
import { router as productRouter } from "../product/router.js";
router.use(productRouter);

//~ User
import { router as clientRouter } from "../client/router.js";
router.use(clientRouter);

//~ Export all routes
export { router };
