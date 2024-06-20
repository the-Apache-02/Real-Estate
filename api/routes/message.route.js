import express from "express";
import { verifyToken } from "../middleware/verifyJwt.middleware.js";

import { addMessage } from "../controllers/message.controller.js";



const router=express();

router.post("/:chatId",verifyToken,addMessage)

export default router