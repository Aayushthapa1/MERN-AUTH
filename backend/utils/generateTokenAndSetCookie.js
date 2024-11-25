import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d", // Token expires in 7 days
    });

    // Set the token in a cookie
    res.cookie("token", token, {
        httpOnly: true, // Cookie is accessible only by the web server
        secure: process.env.NODE_ENV === "production", // Secure in production
        sameSite: "strict", // Prevent CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expires in 7 days
    });

    return token; // Return the token as part of the function's logic
};
