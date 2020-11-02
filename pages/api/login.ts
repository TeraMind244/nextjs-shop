import assert from "assert";
import { NextApiRequest, NextApiResponse } from "next";
import { login as authLogin } from "../../services/AuthenticationService";

const login = (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") {
		return res.status(405).json({ error: true, message: "Method Not Allowed" });
	}
	try {
		assert.notStrictEqual(null, req.body.username, "Email required");
		assert.notStrictEqual(null, req.body.password, "Password required");
	} catch (error) {
		return res.status(403).json({ error: true, message: error.message });
	}
	const username = req.body.username;
	const password = req.body.password;
	const loginSuccess = authLogin({ username, password });

	if (loginSuccess) {
		return res.status(200).json({ message: "Login successfully!" });
	} else {
		return res.status(401).json({ message: "Login failed!" });
	}
};

export default login;
