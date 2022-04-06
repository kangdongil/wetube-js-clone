import express from "express";

const PORT = 4000;

const app = express();

const handleHome = (req, res) => {
	return res.send("hii");
};
const handleLogin = (req, res) => {
	return res.send("Login Here");
};
app.get("/", handleHome);
app.get("/login", handleLogin);

const handleListening = () => console.log(`✅ Server Listening on PORT ${PORT}: https://wetube--tbzwn.run.goorm.io/`);
app.listen(PORT, handleListening);