import express from "express";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userController.js";
import { home, search } from "../controllers/videoController.js";
import { publicOnlyMiddleware } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/join").get(getJoin).post(postJoin);
globalRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);
globalRouter.get("/search", search);

export default globalRouter;