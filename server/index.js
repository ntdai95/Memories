import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import memoryRouter from "./routes/memory.js";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.SERVER_PORT || 5000;
const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/users", userRouter);
app.use("/memory", memoryRouter);
app.get("/", (req, res) => {
    res.send("Welcome to memory API");
});

mongoose.connect(process.env.MONGODB)
        .then(() => {
            app.listen(port, () => console.log(`Server running on port ${port}`));
        })
        .catch((error) => console.log(`${error} did not connect`));