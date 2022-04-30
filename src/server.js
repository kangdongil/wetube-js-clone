import express from "express";
import morgan from "morgan";
import session from "express-session";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use(session({
	secret: "Hello!",
	resave : true,
	saveUninitialized: true,
}))

/*
// Browser의 header 내용 확인하기
app.use((req, res, next) => {
	console.log(req.headers);
	next();
});
*/

/*
// Server에 저장된 session 목록 확인하기
app.use((req, res, next) => {
	req.sessionStore.all((err, sessions) => {
		console.log(sessions);
		next();
	});
});
*/

/*
app.get("/add-one", (req, res, next) => {
	req.session.visited += 1;
	return res.send(`${req.session.id}\n${req.session.visited}`);
});
*/

app.use(localsMiddleware);

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;