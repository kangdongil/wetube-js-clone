const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addComment = (text) => {
	const videoComments = document.querySelector(".video__comments ul");
	const newComment = document.createElement("li");
	newComment.className = "video__comment";
	const icon = document.createElement("i");
	const span = document.createElement("span");
	icon.className = "fas fa-user";
	span.innerText = ` ${text}`
	newComment.appendChild(icon);
	newComment.appendChild(span);
	videoComments.prepend(newComment);
}

const handleSubmit = async () => {
	event.preventDefault();
	const textarea = form.querySelector("textarea");
	const { id } = videoContainer.dataset;
	const text = textarea.value;
	if (text === "") {
		return;
	}
	const { status } = await fetch(`/api/videos/${id}/comment`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ text }),
	});
	textarea.value = "";
	if (status === 201) {
		addComment(text);
	}
	// window.location.reload();
};

if (form) {
	form.addEventListener("submit", handleSubmit);
}