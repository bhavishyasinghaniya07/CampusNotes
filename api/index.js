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


const allowedOrigins = [
  "https://campusnotes-amh9.onrender.com",
  "http://localhost:3000"
];

// Handle preflight (OPTIONS) requests manually
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
  }

  // Respond to preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Then use cors middleware as fallback
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// // CORS configuration - IMPORTANT: This must be before any other middleware
// const allowedOrigins = [
//   "https://campusnotes-amh9.onrender.com",
//   "http://localhost:3000",
// ];




// const allowedOrigins = [
//   "https://campusnotes-amh9.onrender.com",
//   "http://localhost:3000"
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true
// }));


// // First, set CORS headers manually for all responses, including error responses
// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin);
//   }
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, credentials"
//   );
//   res.header("Access-Control-Allow-Credentials", "true");

//   // Handle preflight requests
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   next();
// });

// Then use other middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});

app.get("/", (req, res) => {
  res.send("Hello from Campus Notes API");
});

// Simple test endpoint to verify CORS is working
app.get("/api/test-cors", (req, res) => {
  res.json({ success: true, message: "CORS is working correctly!" });
});

app.use("/api/notes", notesRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/uploading", uploadingRouter);
app.use("/api/admin", adminRoutes);

// Error handler - make sure it preserves CORS headers
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Send error response with appropriate CORS headers already set
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
