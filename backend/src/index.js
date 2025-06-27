import express from "express";
import authroutes from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";

import path from "path";

app.use(express.json({ limit: "2mb" })); // Increase limit
app.use(express.urlencoded({ limit: "2mb", extended: true })); // Increase limit
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);

dotenv.config();
const port = process.env.PORT;
const __dirname = path.resolve();

app.use("/api/auth", authroutes);
app.use("/api/messages", messageRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(port, (req, res) => {
  console.log(`Backend running on port ${port}`);
  connectDB();
});
