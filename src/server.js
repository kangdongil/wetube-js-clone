import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

const home = (req, res) => {
	return res.send("hii");
};

app.use(logger);
app.get("/", home);
app.get("/protected", (req, res) => res.send("Welcome to Private Lounge"));

const handleListening = () => console.log(`✅ Server Listening on PORT ${PORT}: https://wetube--tbzwn.run.goorm.io/`);
app.listen(PORT, handleListening);