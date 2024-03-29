import User from "../models/User";
import Video from "../models/Video";
import fetch from "node-fetch";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => 
	res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
	const { email, username, password, password2, name, location } = req.body;
	const pageTitle = "Join";
	const errMsg = [];
	const usernameExists = await User.exists({ username });
	const emailExists = await User.exists({ email });
	if(password !== password2) {
		errMsg.push("Password confirmation does not match")
	}
	if (usernameExists) {
		errMsg.push("This username is already taken.")
	}
	if (emailExists) {
		errMsg.push("This email is already taken.");
	}
	if (errMsg.length > 0) {
		return res.status(400).render("join", {
			pageTitle: "Join",
			errMsg
		})
	}
	try {
		await User.create({
			email,
			username,
			password,
			name,
			location
		});
		return res.redirect("/login");
	} catch (err) {
		errMsg.push(err)
		return res.status(400). render("join", {
			pageTitle: "Join",
			errMsg
		})
	}
};
export const remove = (req, res) => res.send("Remove");
export const getLogin = (req, res) => {
	return res.render("login", { pageTitle: "Login" });
};
export const postLogin = async(req, res) => {
	const { username, password } = req.body;
	const errMsg = [];
	const user = await User.findOne({ username, githubLoginOnly: false });
	if (!user) {
		errMsg.push("An account with this username does not exists.");
		return res.status(400).render("login", {
			pageTitle: "Login",
			errMsg
		})
	}
	const pwCompare = await bcrypt.compare(password, user.password);
	if (!pwCompare) {
		errMsg.push("Wrong Passowrd.");
		return res.status(400).render("login", {
			pageTitle: "Login",
			errMsg
		})
	}
	req.session.loggedIn = true;
	req.session.user = user;
	return res.redirect("/");
};
export const authGithubLogin = (req, res) => {
	const baseUrl = "https://github.com/login/oauth/authorize";
	const config = {
		client_id: process.env.GH_CLIENT,
		allow_signup: false,
		scope: "read:user user:email"
	};
	const params = new URLSearchParams(config).toString();
	return res.redirect(`${baseUrl}?${params}`);
};
export const callbackGithubLogin = async (req, res) => {
	const baseUrl = "https://github.com/login/oauth/access_token";
	const config = {
		client_id: process.env.GH_CLIENT,
		client_secret: process.env.GH_SECRET,
		code: req.query.code
	};
	const params = new URLSearchParams(config).toString();
	const tokenRequest = await (
		await fetch(`${baseUrl}?${params}`, {
			method: "POST",
			headers: {
				Accept: "application/json",
			},
		})
	).json();
	if ("access_token" in tokenRequest) {
		const { access_token } = tokenRequest;
		const apiUrl = "https://api.github.com";
		const userData = await (
			await fetch(`${apiUrl}/user`, {
				headers: {
					Authorization: `token ${access_token}`
				},
			})
		).json();
		// console.log(userData);
		const emailData = await (
			await fetch(`${apiUrl}/user/emails`, {
				headers: {
					Authorization: `token ${access_token}`
				},
			})
		).json();
		const emailObj = emailData.find(
			(email) => email.primary === true && email.verified === true
		);
		if (!emailObj) {
			//Notifiation하기
			return res.redirect("/login");
		}
		let user = await User.findOne({ email: emailObj.email });
		if (!user) {
			user = await User.create({
				email: emailObj.email,
				avatarUrl: userData.avatar_url,
				username: userData.login,
				password: "",
				githubLoginOnly: true,
				name: userData.name ? userData.name : userData.login,
				location: userData.location ? userData.location : "None",
			});
		}
		req.session.loggedIn = true;
		req.session.user = user;
		return res.redirect("/");
	} else {
		return res.redirect("/login");
	}
};
export const logout = (req, res) => {
	req.session.user = null;
	res.locals.loggedInUser = req.session.user;
	req.session.loggedIn = false;
	// req.session.destroy();
	req.flash("info", "Account Log-out");
	return res.redirect("/");
};
export const getEdit = (req, res) => {
	return res.render("edit-profile", { pageTitle: "Edit Profile" });
};
export const postEdit = async (req, res) => {
	const { _id, email: sessionEmail, username: sessionUsername, avatarUrl } = req.session.user;
	const { name, email, username, location } = req.body;
	const { file } = req;
	let searchParam = [];
	let errMsg = [];
	console.log("email: ", sessionEmail, email);
	if (sessionEmail !== email) {
		searchParam.push({ email });
		errMsg.push("This email is already taken.");
	}
	console.log("username: ", sessionUsername, username);
	if (sessionUsername !== username) {
		searchParam.push({ username });
		errMsg.push("this username is already taken.");
	}
	if (searchParam.length > 0) {
		const foundUser = await User.findOne({ $or: searchParam });
		if (foundUser && foundUser._id.toString() !== _id) {
			return res.status(400).render("edit-profile", {
				pageTitle: "Edit Profile",
				errMsg,
			})
		}
	}
	const updatedUser = await User.findByIdAndUpdate(_id, {
			avatarUrl: file ? file.path : avatarUrl,
			name,
			email,
			username,
			location
		},
		{ new: true }
	);
	req.session.user = updatedUser;
	return res.redirect("/users/edit");
};
export const getChangePassword = (req, res) => {
	if (req.session.user.githubLoginOnly === true) {
		req.flash("error", "Can't change password");
		return res.redirect("/");
	}
	return res.render("users/change-password", { pageTitle: "Change Password" })
}
export const postChangePassword = async (req, res) => {
	const { oldPassword, newPassword, newPasswordConfirmation } = req.body;
	const { user: { _id, password } } = req.session;
	const errMsg = [];
	const userExists = await bcrypt.compare(oldPassword, password);
	if (!userExists) {
		errMsg.push("The current password is incorrect.");
		return res.status(400).render("users/change-password", {
			pageTitle: "Change Password",
			errMsg
		});
	}
	if (newPassword !== newPasswordConfirmation) {
		errMsg.push("The password does not match the confirmation");
		return res.status(400).render("users/change-password", {
			pageTitle: "Change Password",
			errMsg
		});
	}
	const user = await User.findById(_id);
	user.password = newPassword;
	await user.save();
	req.session.user.password = user.password;
	req.flash("info", "Password Updated");
	return res.redirect("/users/logout");
}
export const see = async (req, res) => {
	const { id } = req.params;
	const user = await User.findById(id).populate("videos");
	if (!user) {
		return res.status(404).render("404", { pageTitle: "User not found." });
	}
	// const videos = await Video.find({ owner: user._id });
	return res.render("users/profile", { pageTitle: user.name, user });
};
