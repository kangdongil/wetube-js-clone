import express from "express";
import { join } from "../controllers/userController.js";
import { recommended } from "../controllers/videoController.js";

const globalRouter = express.Router();

globalRouter.get("/", recommended);
globalRouter.get("/join", join);

export default globalRouter;