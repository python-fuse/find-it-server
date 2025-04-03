import express, { Application, json } from "express";
import { userRouter } from "../modules/user/User.routes";
import { authRouter } from "../modules/auth/Auth.routes";
import { errorHandler } from "../middlewares/error.handler";
import { logger } from "../middlewares/logger";
const app: Application = express();
import session from "express-session";
import { myPassport } from "../passport";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import prisma from "../utils/prisma";
import { authorizeUser } from "../middlewares/authorization.middleware";
import { User } from "@prisma/client";
import { postRouter } from "../modules/post/post.routes";
import { commentsRouter } from "../modules/comments/comments.routes";

const cookieSecret = process.env.COOKIE_SECRET || "";

app.use(json());
app.use(logger);

app.use(myPassport.initialize());
app.use(
  session({
    secret: cookieSecret,
    cookie: { secure: false, sameSite: "lax" },
    saveUninitialized: false,
    resave: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
    }),
  })
);
app.use(myPassport.session());

app.get("/", authorizeUser, (req, res) => {
  const user: User = req.user as User;
  res.send(`Hello ${user.username}!`);
});

app.use("/v1/users", authorizeUser, userRouter);
app.use("/v1/auth", authRouter);
app.use("/v1/posts", authorizeUser, postRouter);
app.use("/v1/comments", authorizeUser, commentsRouter);

app.use(errorHandler);

export default app;
