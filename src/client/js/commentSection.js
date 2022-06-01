const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtns = document.querySelectorAll(".deleteBtn");

const addComment = (text, id) => {
	const videoComments = document.querySelector(".video__comments ul");
	const newComment = document.createElement("li");
	newComment.dataset.id = id;
	newComment.className = "video__comment";
	const icon = document.createElement("i");
	const span = document.createElement("span");
	const span2 = document.createElement("span");
	const delIcon = document.createElement("i");
	icon.className = "fas fa-user";
	span.innerText = ` ${text}`;
	span2.className = "deleteBtn";
	span2.addEventListener("click", handleDelete);
	delIcon.className = "fas fa-times";
	newComment.appendChild(icon);
	newComment.appendChild(span);
	span2.appendChild(delIcon);
	newComment.appendChild(span2);
	videoComments.prepend(newComment);
}

let deleteComment = (commentId) => {
	const selectedList = document.querySelector(
		`li.video__comment[data-id='${commentId}']`
	);
	selectedList.remove();
}

const handleSubmit = async () => {
	event.preventDefault();
	const textarea = form.querySelector("textarea");
	const { id } = videoContainer.dataset;
	const text = textarea.value;
	if (text === "") {
		return;
	}
	const response = await fetch(`/api/videos/${id}/comment`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ text }),
	});
	if (response.status === 201) {
		textarea.value = "";
		const { newcommentId } = await response.json();
		addComment(text, newcommentId);
	}
	// window.location.reload();
};

if (form) {
	form.addEventListener("submit", handleSubmit);
}

const handleDelete = async (event) => {
	const commentId = event.path[2].dataset.id;
	console.log("FrontEnd: ", commentId)
	const response = await fetch(`/api/comments/${commentId}/delete`, {
		method: "DELETE"
	});
	deleteComment(commentId);
};

if (deleteBtns) {
	for (const btn of deleteBtns) {
		btn.addEventListener("click", handleDelete);
	}
}