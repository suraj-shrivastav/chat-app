import express from "express";
import authroutes from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json({ limit: "2mb" })); // Increase limit
app.use(express.urlencoded({ limit: "2mb", extended: true })); // Increase limit
app.use(cookieParser());

// temporary solution for CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, OPTIONS", // Include PUT
    allowedHeaders: "Content-Type, Authorization",
    credentials: true, // Allow cookies to be sent
  })
);

dotenv.config();
const port = process.env.PORT;
app.use("/api/auth", authroutes);
app.use("/api/messages", messageRoute);

app.listen(port, (req, res) => {
  console.log(`Bckedn running on port ${port}`);
  connectDB();
});
