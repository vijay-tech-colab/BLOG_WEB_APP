import express from "express";
import dotenv from "dotenv";
import globleErrorHandler from "./middlewares/globleErrorMidleware.js";
dotenv.config({ path: "./config/config.env" });
import morgan from "morgan";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressFileUpload from "express-fileupload";
import blogRouter from "./routes/blogPostRoutes.js";
import messageRouter from "./routes/messageRoute.js";
import likeRouter from "./routes/likeRouter.js";
import subscriberRouter from "./routes/subscriberRouter.js";
import userRouter from "./routes/userRoutes.js";
const app = express();

app.use(
  cors({
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: process.env.FRONTEND_URL,
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
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/blogs" ,likeRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/subscriber", subscriberRouter);
app.use(globleErrorHandler);
export default app;
