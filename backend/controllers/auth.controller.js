import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail , sendWelcomeEmail } from "../mailtrap/emails.js";

export const signup = async (req, res) => {


    const { name, email, password } = req.body;

    try {
        // Validate request body
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory",
            });
        }

        // Check if user already exists
        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Generate verification token
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        // Create a new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpireAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        });

        await user.save();

        // Generate JWT and set cookie
        generateTokenAndSetCookie(res, user._id);

        // Send verification email
        await sendVerificationEmail(user.email, verificationToken);

        // Respond with success
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user.doc,
                password: undefined, // Exclude password from response
            },
        });
    } catch (error) {
        // Handle errors and send response
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const verifyEmail = async function (req, res) {
    const {code} = req.body;

    try {
        const user = await User.findOne({verificationToken: code, verificationTokenExpireAt: {$gt: Date.now()}});

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid verification code",
            });
        }

        if(user.verificationTokenExpireAt < Date.now()){
            return res.status(400).json({
                success: false,
                message: "Verification code has expired",
            }); 
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpireAt = undefined;

        await user.save();

        await sendWelcomeEmail(user.email, user.name);
        res.status(200).json({success: true, message: "Email verified successfully"
            ,user : {
                ...user._doc,
                password: undefined
            }
        });
    }
    catch (error) {
        console.log("error in verifying email",error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }



};

export const login = async (req, res) => {
    res.send("login route");  
};

export const logout = async (req, res) => {
    res.send("logout route");
};