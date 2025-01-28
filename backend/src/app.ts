import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import path from "path";

import { userRouter } from "./routes/userRoutes";

const app = express();
dotenv.config({ path: path.resolve(__dirname, "../.env") });

app.use(
  cors({
    origin: [
      process.env.PICHAU_URL || "http://localhost:5173",
      process.env.DASHBOARD_URL || "http://localhost:5174",
    ],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/user", userRouter);

export default app;
