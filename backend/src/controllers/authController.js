import User from "../models/User.js";
import bcrypt, { compare } from "bcryptjs";
import { createAccessToken } from "../utils/jwt.js";
export async function login(req, res) {
    const { email, password } = req.body;
    try {
        
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: "User not found" });

        const isMatch = password === userFound.password;
        if (!isMatch) return res.status(400).json({ message: "Incorrect Password" });
        const isProduction = process.env.NODE_ENV === "production";
        const token = await createAccessToken({ id: userFound._id });
        console.log(userFound);
        res.cookie("token", token, {
            httpOnly: isProduction, 
            secure: isProduction,
            sameSite: isProduction ? 'None' : 'Lax', 
        });
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
        console.log("succesfully logged in")

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function logout(req, res) {
    res.cookie("token", "", { expires: new Date(0) });
    return res.sendStatus(200);
}

export async function verifyToken (req, res) {
    try {
        const userFound = await User.findById(req.user.id);

        if (!userFound){
            return res.status(401).json({message: "user not found"}); 
        }

        return res.status(200).json({
            success: true,
            user: {
                id: userFound.id,
                username: userFound.username,
                email: userFound.email,
            },

        }); 
    } catch (error) {
        return res.status(500).json({message: "error verifying user"}); 
    }
}
