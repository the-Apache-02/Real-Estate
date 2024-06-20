import express from "express"
import { addPost, deletePost, getAllPost, getSinglePost, updatePost } from "../controllers/post.controller.js";
import { verifyToken } from "../middleware/verifyJwt.middleware.js";

const router=express.Router();

router.get("/",getAllPost);
router.get("/:id",getSinglePost);
router.put("/:id",verifyToken,updatePost);
router.post("/",verifyToken,addPost)
router.delete("/:id",verifyToken,deletePost)
export default router;