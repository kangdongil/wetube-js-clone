import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

export const home = async(req, res) => {
	const videos = await Video.find({}).sort({ createdAt: "desc" }).populate("owner");
	return res.render("home", { pageTitle: "Home", videos });
};
export const watch = async(req, res) => {
	const { id } = req.params;
	const video = await Video.findById(id).populate("owner").populate("comments");
	if (!video) {
		return res.status(404).render("404", { pageTitle: "Video not found."});
	};
	console.log(video);
	return res.render("watch", { pageTitle: video.title, video });
};
export const getEdit = async(req, res) => {
	const { id } = req.params;
	const { user: { _id }} = req.session;
	const video = await Video.findById(id);
	if (!video) {
		return res.status(404).render("404", { pageTitle: "Video not found."});
	}
	console.log(video.owner._id, _id);
	if (String(video.owner._id) !== String(_id)) {
		return res.status(403).redirect("/");
	}
	return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};
export const postEdit = async (req, res) => {
	const { id } = req.params;
	const { user: { _id }} = req.session;
	const { title, description, hashtags } = req.body;
	const video = await Video.exists({ _id: id });
	if (!video) {
		return res.status(404).render("404", { pageTitle: "Video not found."});
	}
	if (String(video.owner) !== String(_id)) {
		req.flash("error", "Not the owner of the video");
		return res.status(403).redirect("/");
	}
	await Video.findByIdAndUpdate(id, {
		title,
		description,
		hashtags: Video.formatHashtags(hashtags)
	});
	req.flash("success", "Changes saved.")
	return res.redirect(`/videos/${id}`);
};
export const deleteVideo = async(req, res) => {
	const { id } = req.params;
	const { user: { _id }} = req.session;
	const video = await Video.findById(id);
	if (!video) {
		return res.status(404).render("404", { pageTitle: "Video not found."});
	}
	if (String(video.owner) !== String(_id)) {
		return res.status(403).redirect("/");
	}
	await Video.findByIdAndDelete(id);
	return res.redirect("/")
};
export const search = async(req, res) => {
	const { keyword } = req.query;
	let videos = [];
	if (keyword) {
		videos = await Video.find({
			title: {
				$regex: new RegExp(keyword, "i")
			}
		}).populate("owner");
	}
	return res.render("search", { pageTitle: "Search", videos });
};
export const getUpload = (req, res) => {
	return res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = async(req, res) => {
	const { user: { _id } } = req.session;
	const { path: fileUrl } = req.file;
	const { title, description, hashtags } = req.body;
	try {
		const newVideo = await Video.create({
			title,
			description,
			fileUrl,
			owner: _id,
			hashtags: Video.formatHashtags(hashtags)
		});
		const user = await User.findById(_id);
		user.videos.push(newVideo._id);
		await user.save();
	} catch(err) {
		console.log(err);
		return res.status(400).render("upload", {
			pageTitle: "Upload Video",
			errMsg: err._message
		});
	}
	return res.redirect("/");
}
export const registerView = async (req, res) => {
	const { id } = req.params;
	const video = await Video.findById(id);
	if (!video) {
		return res.sendStatus(404);
	}
	video.meta.views = video.meta.views + 1;
	await video.save();
	return res.sendStatus(200);
}
export const createComment = async (req, res) => {
	const { id } = req.params;
	const { text } = req.body;
	const { user } = req.session;
	
	const video = await Video.findById(id);
	if (!video) {
		return res.sendStatus(404);
	}
	const comment = await Comment.create({
		text,
		owner: user._id,
		video: id
	});
	video.comments.push(comment._id);
	video.save();
	console.log(video);
	return res.status(201).json({ newcommentId: comment._id });
}

export const deleteComment = async (req, res) => {
	const { _id } = req.session.user;
	const { id: commentId } = req.params;

	const comment = await Comment.findById(commentId);
	const videoId = comment.video;
	if (String(_id) !== String(comment.owner._id)) {
		return res.sendStatus(403);
	}
	const video = await Video.findById(videoId);
	if (!video) {
		return res.sendStatus(404);
	}
	console.log(video.comments.indexOf(commentId));
	video.comments.splice(video.comments.indexOf(commentId), 1);
	console.log(video);
	await video.save();
	await Comment.findByIdAndDelete(commentId);
	
	return res.sendStatus(200);
}