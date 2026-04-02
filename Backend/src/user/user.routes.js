import { Router } from "express";
import { createUser, login, sendEmail } from "./user.controller.js";

const userRouter = Router();

// @post /api/user/signup
userRouter.post('/signup', createUser);

// @post /api/user/login
userRouter.post('/login', login);

// @post /api/user/send-mail
userRouter.post('/send-mail', sendEmail);

export default userRouter;
