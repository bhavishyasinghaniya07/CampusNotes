import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import uploadingRouter from "./routes/uploading.route.js";
import notesRouter from "./routes/notes.route.js";
import cors from "cors"; // ⬅️ This is missing

dotenv.config();

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

const corsOptions = {
  origin: "http://localhost:5173", // Your frontend URL
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true, // Allow credentials (cookies)
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.use("/api/notes", notesRouter);

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/uploading", uploadingRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
