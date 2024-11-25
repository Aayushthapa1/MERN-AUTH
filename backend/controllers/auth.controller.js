import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";



export const signup = async (req, res) => {
    const { name, email, password } = req.body;
   try{
    if(!name || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAlreadyExists = await User.findOne({email});
    if(userAlreadyExists){
        res.status(400).json({
            success: false,
            message: "User already exists"
        });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken =  Math.floor(100000 + Math.random() * 900000).toString();;
    const user = new User({
        name,
        email,
        password: hashedPassword,
        verificationToken,
        verificationTokenExpireAt : Date.now() + 24 * 60 * 60 * 1000 //24 hours

    });
   await user.save();
   // jwt 

   generateTokenAndSetCookie(res,user._id);
    

   } catch (error) {
    
    res.status(400).json({
        success: false,
        message: error.message
    });
    
   }
};

export const login = async (req, res) => {
    res.send("login route");
};

export const logout = async (req, res) => {
    res.send("logout route");
};