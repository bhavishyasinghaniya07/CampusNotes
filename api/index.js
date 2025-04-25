import dotenv from "dotenv";
dotenv.config();

// In an ESM file (e.g., .mjs or .js with "type": "module")
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// Now you can use require
const fs = require("fs");
const coreJs = require("core-js");

import express from "express";
import mongoose from "mongoose";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import uploadingRouter from "./routes/uploading.route.js";
import notesRouter from "./routes/notes.route.js";
import cors from "cors";
import adminRoutes from "./routes/admin.route.js";
import { verifyToken } from "./utils/verifyUser.js";

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Server is runnig at port 3000");
});

// const allowedOrigins = ["https://campusnotes-amh9.onrender.com"];
const allowedOrigins = [
  "https://campusnotes-amh9.onrender.com",
  "http://localhost:3000",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Added OPTIONS method
  allowedHeaders: ["Content-Type", "Authorization", "credentials"], // Added 'credentials'
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello from Campus Notes API");
});

app.use("/api/notes", notesRouter);

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/uploading", uploadingRouter);
app.use("/api/admin", adminRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
