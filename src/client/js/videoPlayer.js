const video = document.querySelector("video");
const videoContainer = document.getElementById("videoContainer");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volumn = volumeValue;

const handlePlay = () => {
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
	playBtn.innerText = video.paused ? "Play" : "Pause";
};

const handleMute = () => {
	if (video.muted) {
		video.muted = false;
		muteBtn.innerText = "Mute";
	} else {
		video.muted = true;
	}
	muteBtn.innerText = video.muted ? "UnMute" : "Mute";
	volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
	const { target: { value } } = event;
	if (video.muted) {
		video.muted = false;
		muteBtn.innerText = "Mute";
	}
	if (Number(value) === 0) {
		video.muted = true;
		muteBtn.innerText = "Unmute";
	} else {
		video.muted = false;
		muteBtn.innerText = "Mute";
	}
	volumeValue = value;
	video.volume = value;
}

const formatTime = (seconds) => 
	new Date(seconds * 1000).toISOString().substring(14, 19);

const handleLoadedMetadata = () => {
	totalTime.innerText = formatTime(Math.floor(video.duration));
	timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
	currentTime.innerText = formatTime(Math.floor(video.currentTime));
	timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
	const { target: { value } } = event;
	video.currentTime = value;
};

const handleFullscreen = () => {
	const fullscreen = document.fullscreenElement;
	if (fullscreen) {
		document.exitFullscreen();
		fullScreenBtn.innerText = "Fullscreen";
	} else {
		videoContainer.requestFullscreen();
		fullScreenBtn.innerText = "Back to Normal";
	}
}

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
	if (controlsTimeout) {
		clearTimeout(controlsTimeout);
		controlsTimeout = null;
	}
	if (controlsMovementTimeout) {
		clearTimeout(controlsMovementTimeout);
		controlsMovementTimeout = null;
	}
	videoControls.classList.add("showing");
	controlsMovementTimeout = setTimeout(hideControls, 3000);
}

const handleMouseLeave = () => {
	controlsTimeout = setTimeout(() => hideControls, 3 * 1000);
}

playBtn.addEventListener("click", handlePlay);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);

if (video.readyState === 4) {
	handleLoadedMetadata();
}