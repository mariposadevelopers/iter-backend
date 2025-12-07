import Post from "../models/Post.js";

export async function getAllPosts (req, res){
    try {
        const posts = await Post.find();
        res.status(201).json(posts);
    } catch(error){
        res.status(500).json(error)
    }
}

export async function getPostById (req, res) {
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({message: "Post not found"});
        }
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({message: "Internal server error."})
    }
}

export async function postPost (req, res) {
    try {
        console.log(req.user); 
        const {title, content, comments} = req.body; 
        const post = new Post({title, content, comments});
        const savedPost = await post.save(); 
        res.status(201).json({savedPost});
    } catch (error) {
        console.error("Error creating post:", error); 
        res.status(500).json(error); 
    }
}

export async function updatePost (req, res) {
    try {
        console.log(req.title);
        const {title, content} = req.body;
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {title, content});
        if (!updatedPost) {
            return res.status(404).json({message: "Post not found"});
        }
        res.status(201).json({message : "Update completed succesfully "})    
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message: "Internal server error. "})    
    }
}

export async function deletePost (req, res) {

    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if(!deletedPost){
            return res.status(404).json({message: "Post not found"});
        }
        res.status(201).json({message : "Delete completed succesfully "})   

    } catch (error) {
        res.status(500).json({message: "Internal server error."})
    }
};