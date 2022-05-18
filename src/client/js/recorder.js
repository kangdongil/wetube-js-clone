const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = () => {
	const a = document.createElement("a");
	a.href = videoFile;
	a.download = "MyRecord.webm";
	a.click();
}

const handleStop = () => {
	startBtn.innerText = "Download Recording";
	startBtn.removeEventListener("click", handleStop);
	startBtn.addEventListener("click", handleDownload);
	
	recorder.stop();
}

const handleStart = () => {
	startBtn.innerText = "Stop Recording";
	startBtn.removeEventListener("click", handleStart);
	startBtn.addEventListener("click", handleStop);
	
	recorder = new window.MediaRecorder(stream, { mimeType: "video/webm" });
	recorder.ondataavailable = (event) => {
		videoFile = URL.createObjectURL(event.data);
		video.srcObject = null;
		video.src = videoFile;
		// video.loop = true;
		video.play();
	};
	recorder.start();
	setTimeout(() => {
		handleStop();
	}, 10000);	
};

const initPreview = async () => {
	stream = await navigator.mediaDevices.getUserMedia({
		audio: false,
		video: true,
	});
	video.srcObject = stream;
	video.play();
};

initPreview();

startBtn.addEventListener("click", handleStart);