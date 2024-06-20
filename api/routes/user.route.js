import express from "express";
import { verifyToken } from "../middleware/verifyJwt.middleware.js";
import { deleteUser, getAllUsers, getSingleUser, updateUser,savePost, profilePost, getNotification } from "../controllers/user.controller.js";



const router=express();

router.get("/getUsers",getAllUsers);
// router.get("/:id",verifyToken,getSingleUser);
router.put("/:id",verifyToken,updateUser);
router.delete("/:id",verifyToken,deleteUser); 
router.post("/save",verifyToken,savePost); 
router.get("/profilePost",profilePost); 
router.get("/notification",verifyToken,getNotification); 

export default router