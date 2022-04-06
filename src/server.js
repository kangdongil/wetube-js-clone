import express from "express";

const PORT = 4000;

const app = express();

const gossipMiddleware = (req, res, next) => {
	console.log(`Someone is going to: ${req.url}`);
	next();
}

const handleHome = (req, res) => {
	return res.send("hii");
};
app.get("/", gossipMiddleware, handleHome);

const handleListening = () => console.log(`✅ Server Listening on PORT ${PORT}: https://wetube--tbzwn.run.goorm.io/`);
app.listen(PORT, handleListening);