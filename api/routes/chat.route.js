import express from "express";
import { verifyToken } from "../middleware/verifyJwt.middleware.js";
import { deleteUser, getAllUsers, getSingleUser, updateUser,savePost, profilePost } from "../controllers/user.controller.js";
import { addChat, getChat, getChats, readChat } from "../controllers/chat.controller.js";



const router=express();

router.get("/",verifyToken,getChats);
router.get("/:id",verifyToken,getChat);
router.post("/",verifyToken,addChat);
router.put("/read/:id",verifyToken,readChat);

export default router