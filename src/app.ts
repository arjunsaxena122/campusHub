import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { customErrorHandler } from "./middlewares/error.middleware";

const app: Application = express();

// Middleware

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

const options = {
  origin: ["*"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credential: true,
};

app.use(cors(options));

// Import Routers

import authRouter from "./routes/auth.route";
import announcementRouter from "./routes/announcement.route";
import resultRouter from "./routes/result.route";
import courseRouter from "./routes/course.route";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/", announcementRouter);
app.use("/api/v1/result", resultRouter);
app.use("/api/v1/course", courseRouter);

// Custom Error Handler

app.use(customErrorHandler);

export default app;
