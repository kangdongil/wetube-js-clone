const video = document.querySelector("video");
const videoContainer = document.getElementById("videoContainer");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoControls = document.getElementById("videoControls");

let mouseStopTimeoutID = null;
let controlsTimeoutID = null;
let volumeValue = 0.5;
video.volumn = volumeValue;

const handlePlay = () => {
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
	playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMute = () => {
	if (video.muted) {
		video.muted = false;
	} else {
		video.muted = true;
	}
	muteBtnIcon.classList = video.muted
		? "fas fa-volume-mute"
		: "fas fa-volume-up";
	volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolume = (event) => {
	const { target: { value } } = event;
	if (video.muted) {
		video.muted = false;
		muteBtnIcon.classList = "fas fa-volume-mute";
	}
	if (Number(value) === 0) {
		video.muted = true;
		muteBtnIcon.classList = "fas fa-volume-up";
	} else {
		video.muted = false;
		muteBtnIcon.classList = "fas fa-volume-mute";
	}
	volumeValue = value;
	video.volume = value;
}

const timeFormat = (seconds) => 
	new Date(seconds * 1000).toISOString().substring(14, 19);

const handleMetaData = () => {
	totalTime.innerText = timeFormat(Math.floor(video.duration));
	timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
	currentTime.innerText = timeFormat(Math.floor(video.currentTime));
	timeline.value = Math.floor(video.currentTime);
};

const handleTimeline = (event) => {
	const { target: { value } } = event;
	video.currentTime = value;
};

const handleFullscreen = () => {
	const fullscreen = document.fullscreenElement;
	if (fullscreen) {
		document.exitFullscreen();
		fullScreenIcon.classList = "fas fa-expand";
	} else {
		videoContainer.requestFullscreen();
		fullScreenIcon.classList = "fas fa-compress";
	}
}

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
	if (mouseStopTimeoutID) {
		clearTimeout(mouseStopTimeoutID);
		mouseStopTimeoutID = null;
	}
	if (controlsTimeoutID) {
		clearTimeout(controlsTimeoutID);
		controlsTimeoutID = null;
	}
	videoControls.classList.add("showing");
	controlsTimeoutID = setTimeout(hideControls, 3000);
}

const handleMouseLeave = () => {
	mouseStopTimeoutID = setTimeout(() => hideControls, 3 * 1000);
}

const handleHotKey = (event) => {
	if (event.key === " ") {
		handlePlay();
	}
	if (event.key === "f") {
		handleFullscreen();
	}
}

const handleEnded = () => {
	const { id } = videoContainer.dataset;
	fetch(`/api/videos/${id}/view`, {
		method: "POST",
	});
}


playBtn.addEventListener("click", handlePlay);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolume);
video.addEventListener("loadedmetadata", handleMetaData);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("ended", handleEnded);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
timeline.addEventListener("input", handleTimeline);
fullScreenBtn.addEventListener("click", handleFullscreen);
document.addEventListener("keydown", handleHotKey);
if (video.readyState === 4) {
	handleMetaData();
}