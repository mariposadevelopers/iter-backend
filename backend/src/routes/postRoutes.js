import express from "express";
import { deletePost, getAllPosts, getPostById, postPost, updatePost } from "../controllers/postController.js";
import {authRequired} from "../middlewares/validateToken.js"

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", authRequired, postPost);
router.put("/:id", authRequired, updatePost);
router.delete("/:id", authRequired, deletePost);

export default router;