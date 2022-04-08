import "./db";
import "./models/Video";
import app from "./server";

const PORT = 4000;

const handleListening = () => 
	console.log(`🚀 Server Listening on PORT ${PORT}: https://wetube--tbzwn.run.goorm.io/`);

app.listen(PORT, handleListening);