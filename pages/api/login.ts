import assert from "assert";
import { NextApiRequest, NextApiResponse } from "next";
import { login as authLogin } from "../../services/AuthenticationService";
import cookiesMiddleware, { INextResponse } from "../../utils/CookieHelper";

export const login = async (req: NextApiRequest, res: INextResponse) => {
	if (req.method !== "POST") {
		return res.status(405).json({ error: true, message: "Method Not Allowed" });
	}

	// const cookies = req.cookies;
	// if (cookies[CookieKeys.AUTHENTICATION_ID]) {
	// 	console.log(cookies[CookieKeys.AUTHENTICATION_ID]);

	// 	const username = cookies[CookieKeys.USERNAME];
	// 	const authenticationId = cookies[CookieKeys.AUTHENTICATION_ID];

	// 	console.log(username, authenticationId);

	// 	const loginSuccess = await loginWithAuthenticationId(username, authenticationId);

	// 	if (loginSuccess) {
	// 		return handleLoginSuccess(res, username, authenticationId);
	// 	} else {
	// 		return handleLoginFailed(res);
	// 	}
	// }

	try {
		assert.notStrictEqual(null, req.body.username, "Email required");
		assert.notStrictEqual(null, req.body.password, "Password required");
	} catch (error) {
		return res.status(403).json({ error: true, message: error.message });
	}
	const username = req.body.username;
	const password = req.body.password;
	const authenticationId = await authLogin({ username, password });

	if (authenticationId) {
		return handleLoginSuccess(res, username, authenticationId);
	} else {
		return handleLoginFailed(res);
	}
};

const handleLoginSuccess = (res: INextResponse, username: string, authenticationId: string): void => {
	// res.cookie(CookieKeys.AUTHENTICATION_ID, authenticationId);
	// res.cookie(CookieKeys.USERNAME, username);
	res.status(200).json({ result: authenticationId, message: "Login Successfully"});
};

const handleLoginFailed = (res: NextApiResponse): void => {
	console.log("Got in here somehow");

	res.status(401).json({ result: false, message: "Login failed!" });
};

export default cookiesMiddleware(login);
