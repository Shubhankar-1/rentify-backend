import express from "express";
import cors from "cors";

const app = express();

app.use(
    cors()
);

app.use(express.json());

import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/posts.routes.js";

app.use("/api/user", userRouter);
app.use("/api/posts",postRouter)

export { app };
