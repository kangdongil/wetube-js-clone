import express from "express";
import { getEdit, postEdit, remove, logout, see, authGithubLogin, callbackGithubLogin, getChangePassword, postChangePassword } from "../controllers/userController.js"
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.get("/remove", remove);
userRouter.get("/github/auth", publicOnlyMiddleware, authGithubLogin);
userRouter.get("/github/callback", publicOnlyMiddleware, callbackGithubLogin);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get(":id", see);

export default userRouter;