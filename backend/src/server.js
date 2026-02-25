import express from "express"
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import commentRoutes from "./routes/commentRoutes.js"
import channelRoutes from "./routes/channelRoutes.js"
import researchRoutes from "./routes/researchRoutes.js"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"
import path from "path"
import { connectDb } from "./config/db.js";
import cookieParser from "cookie-parser"
import mongoose from "mongoose"


dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

connectDb();

const clientUrl = process.env.CLIENT_URL;
console.log(`client url ${clientUrl}`)

if (process.env.NODE_ENV === "production" && clientUrl) {
    app.use((req, res, next) => {
        if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        } 
        next();
    });
}


const allowedOrigins = [
    "http://localhost:5173", 
    clientUrl 
].filter(Boolean); 


app.use(cors({
    origin: (origin, callback) => {
        if (process.env.NODE_ENV !== "production" || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log(`CORS Policy: Origin ${origin} not explicitly allowed by Express-CORS.`);
            callback(null, false); 
        }
    },
    credentials: true,
    optionsSuccessStatus: 200 
}));


app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser()); 

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes); 
app.use("/api/channels", channelRoutes); 
app.use("/api/researchs", researchRoutes); 


const __dirname = path.resolve(); 

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get(/.*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log("SEVER STARTED ON PORT", PORT);
});

console.log(mongoose.modelNames());
