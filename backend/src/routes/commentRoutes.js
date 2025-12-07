import express from "express";
import { deleteComment, getCommentsFromPost, postComment } from "../controllers/commentController.js";

const router = express.Router(); 

router.post("", postComment); 
router.get("/post/:postId", getCommentsFromPost);
router.delete("/:id", deleteComment); 
export default router; 