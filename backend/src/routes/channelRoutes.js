import express from "express"
import { deleteChannel, getAllChannels, postChannel } from "../controllers/channelController.js"

const router = express.Router(); 

router.get("/", getAllChannels); 
router.post("/", postChannel); 
router.delete("/:id", deleteChannel); 
export default router;