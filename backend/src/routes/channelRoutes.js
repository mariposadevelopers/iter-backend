import express from "express"
import { getAllChannels, postChannel } from "../controllers/channelController.js"

const router = express.Router(); 

router.get("/", getAllChannels); 
router.post("/", postChannel); 
export default router; 