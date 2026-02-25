import express from "express"
import { deleteResearch, getAllResearchs, postResearch } from "../controllers/researchController.js"

const router = express.Router(); 

router.get("/", getAllResearchs); 
router.post("/", postResearch); 
router.delete("/:id", deleteResearch); 
export default router;