import express from "express";
import { join, login } from "../controllers/userController.js";
import { recommended, search } from "../controllers/videoController.js";

const globalRouter = express.Router();

globalRouter.get("/", recommended);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

export default globalRouter;