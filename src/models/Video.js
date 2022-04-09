import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
	title: { type: String, trim: true, required: true, maxLength: 50 },
	description: { type: String, trim: true, maxLength: 180 },
	createdAt: { type: Date, required: true, default: Date.now },
	hashtags: [{ type: String, trim: true }],
	meta: {
		views: { type: Number, default: 0 },
		rating: { type: Number, default: 0 }
	}
});

videoSchema.pre('save', async function() {
	this.hashtags = this.hashtags[0]
		.split(",")
		.map(word => word.startsWith("#") ? word : `#${word}`)
});

const Video = mongoose.model("Video", videoSchema);
export default Video;