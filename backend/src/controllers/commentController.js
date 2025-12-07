import Comment from "../models/Comment.js";

export async function postComment(req, res) {
    const {content, user, unidentifiedUsername, post} = req.body; 
    
    if (!content || !post) {
        return res.status(400).json({ message: "Content and Post ID are required." });
    }
    
    // Determine the identity source
    const identitySource = {};
    if (user) {
        // Scenario 1: Authenticated User (Teacher)
        identitySource.user = user;
    } else if (unidentifiedUsername) {
        // Scenario 2: Unidentified User (Student)
        identitySource.unidentifiedUsername = unidentifiedUsername;
    } else {
        // If neither user ID nor name is provided
        return res.status(400).json({ message: "User ID or Username must be provided." });
    }

    try {
        const comment = new Comment({
            content, 
            post,
            ...identitySource // Spread the identity field (user or unidentifiedUsername)
        }); 
        
        // Populate the user field *if* it exists, to return the correct data
        const savedComment = await comment.save(); 
        
        // NOTE: You might want to populate the comment before sending it back 
        // if you immediately render it in the UI.
        
        return res.status(200).json({savedComment}); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "An error occurred while posting the comment."}); 
    }
}

export async function deleteComment (req, res) {
    try {
        const commentToDelete = await Comment.findByIdAndDelete(req.params.id); 
        if(!commentToDelete) {
            return res.status(500).json({message: "The comment was not found."});
        } 
        return res.status(201).json({message: "The comment has been deleted"}); 
    } catch (error) {
            return res.status(500).json({message: "An error happened while deleting the comment."})
    }
}

export async function getCommentsFromPost (req, res) {
    try {
        const {postId} = req.params; 
        const comments = await Comment.find({post: postId})
            .populate("user", "username email"); 
        res.status(200).json(comments); 
    } catch (error) {
        res.status(500).json({error}); 
    }
}