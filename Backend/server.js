import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./Database/connectDB.js";
import authRoutes from "./routes/authRoute.js"

dotenv.config();


const app = express();

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.use("/api/auth",authRoutes)

app.listen(3000, () => 
    {
        connectDB();
        console.log("Server is running on port 5000")
});

