const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const handleSubmit = () => {
	event.preventDefault();
	const textarea = form.querySelector("textarea");
	const { id } = videoContainer.dataset;
	const text = textarea.value;
};

if (form) {
	form.addEventListener("submit", handleSubmit);
}