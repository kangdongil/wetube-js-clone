import User from "../models/User";
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
export const edit = (req, res) => res.send("Edit");
export const remove = (req, res) => res.send("Remove");
export const getLogin = (req, res) => {
	return res.render("login", { pageTitle: "Login" });
};
export const postLogin = async(req, res) => {
	const { username, password } = req.body;
	const errMsg = [];
	const user = await User.findOne({ username });
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
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See User");
