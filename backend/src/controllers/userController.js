import User from "../models/User.js";

export async function getAllUsers (req, res){
    try {
        const users = await User.find();
        res.status(201).json(users);
    } catch(error){
        res.status(500).json(error)
    }
}

export async function postUser (req, res) {
    try {
        const {username, email, password, role} = req.body; 
        const user = new User({username, email, password, role});
        const savedUser = await user.save(); 
        res.status(201).json({savedUser});
    } catch (error) {
        res.status(500).json(error); 
    }
}

export async function updateUser (req, res) {
    try {
        const {name, email, role} = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {name, email, role});
        if (!updatedUser) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(201).json({message : "update completed succesfully "})    
    } catch (error) {
        res.status(500).json({message: "Internal server error. "})    
    }
}
export async function deleteUser (req, res) {

    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if(!deleteUser){
            return res.status(404).json({message: "User not found"});
        }
        res.status(201).json({message : "delete completed succesfully "})   

    } catch (error) {
        res.status(500).json({message: "Internal server error."})
    }
};