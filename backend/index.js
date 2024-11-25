import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
    res.send("Hello from backend");
})


app.use("/api/auth",authRoutes);
app.listen(5001, () => {
    connectDB();
    console.log("Server is running on port 5001");
});



