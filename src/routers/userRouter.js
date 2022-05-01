import express from "express";
import { edit, remove, logout, see, authGithubLogin } from "../controllers/userController.js"

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get("/github/auth", authGithubLogin)
userRouter.get(":id", see);

export default userRouter;