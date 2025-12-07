import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", default: null},
    unidentifiedUsername: {type: String, default: null}, 
    post: {type: mongoose.Schema.Types.ObjectId, ref: "Post"}
}, {timestamps: true}); 

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;     