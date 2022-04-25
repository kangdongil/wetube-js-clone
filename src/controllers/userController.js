import User from "../models/User";

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
		return res.render("join", {
			pageTitle: "Join",
			errMsg
		})
	}
	await User.create({
		email,
		username,
		password,
		name,
		location
	});
	return res.redirect("/login");
};
export const edit = (req, res) => res.send("Edit");
export const remove = (req, res) => res.send("Remove");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See User");
