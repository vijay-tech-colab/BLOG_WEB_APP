import express from "express";
import dotenv from "dotenv";
import globleErrorHandler from "./middlewares/globleErrorMidleware.js";
dotenv.config({ path: "./config/config.env" });
import morgan from "morgan";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressFileUpload from "express-fileupload";
const app = express();

app.use(
  cors({
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(
  expressFileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routers
app.use("/api/v1/auth", authRouter);

app.use(globleErrorHandler);
export default app;
