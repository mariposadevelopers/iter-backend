import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    post: {type: mongoose.Schema.Types.ObjectId, ref: "Post"}

}); 