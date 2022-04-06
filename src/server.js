import express from "express";

const PORT = 4000;

const app = express();

const logger = (req, res, next) => {
	console.log(`${req.method} ${req.url}`);
	next();
}
const privateMiddleware = (req, res, next) => {
	const url = req.url;
	if (url === "/protected") {
		return res.send("<h1>Not Allowed</h1>")
	}
	next();
}

const handleHome = (req, res) => {
	return res.send("hii");
};
app.use(logger);
app.use(privateMiddleware);
app.get("/", handleHome);
app.get("/protected", (req, res) => res.send("Welcome to Private Lounge"));

const handleListening = () => console.log(`✅ Server Listening on PORT ${PORT}: https://wetube--tbzwn.run.goorm.io/`);
app.listen(PORT, handleListening);