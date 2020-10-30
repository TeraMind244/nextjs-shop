import { IAuthentication } from "../interfaces/Authentication";

type CookieType = {
	[key: string]: string;
};

export const getAuthentication = (cookie: CookieType): IAuthentication | null => {
	return null;
};

export const transpileCookie = (cookie: string): CookieType => {
	if (!cookie) {
		return {};
	}
	const pairs = cookie.split(";").map(value => value.trim());
	const cookieObject: CookieType = {};
	for (const pair of pairs) {
		const [key, value] = pair.split("=");
		cookieObject[key] = value;
	}
	return cookieObject;
};
