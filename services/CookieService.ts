import Cookies, { Cookie } from "cookies";
import { IAuthentication } from "../interfaces/Authentication";
import { CookieKeys } from "../utils/Constants";

export const getAuthentication = (cookie: Cookies): IAuthentication | null => {
	const username = cookie.get(CookieKeys.USERNAME);
	const authenticationId = cookie.get(CookieKeys.AUTHENTICATION_ID);
	const authenticationTime = parseInt(cookie.get(CookieKeys.AUTHENTICATION_TIME));

	if (!authenticationId) {
		return null;
	}

	return {
		username,
		authenticationId,
		authenticationTime
	};
};

export const removeExpiredAuthentication = (cookie: Cookies): void => {
	[CookieKeys.USERNAME, CookieKeys.AUTHENTICATION_ID, CookieKeys.AUTHENTICATION_TIME].forEach(key => cookie.set(key));
};
