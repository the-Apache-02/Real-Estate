import express from "express"
import { shouldAdminLoggedIn, shouldNormalLoggedIn } from "../controllers/test.controller.js";
import { verifyToken } from "../middleware/verifyJwt.middleware.js";

const router=express();

router.get("/shouldLoggedNormal",verifyToken,shouldNormalLoggedIn);
router.get("/shouldLoggedAdmin",shouldAdminLoggedIn);

export default router