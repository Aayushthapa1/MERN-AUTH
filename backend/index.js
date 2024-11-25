import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello from backend");
})

app.listen(5001, () => {
    console.log("Server is running on port 5001");
});

//aayush134056
//DlPXgS71xlnZeRRd

