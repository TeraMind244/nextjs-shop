import { CookieSerializeOptions, parse, serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { ICookieAuthentication } from "../interfaces";
import { CookieKeys } from "./Constants";

export interface INextResponse extends NextApiResponse {
	cookie: (name: string, value: string, options?: CookieSerializeOptions) => void;
}

export const setCookie = (res: NextApiResponse, name: string, value: string, options: CookieSerializeOptions = {}) => {
	res.setHeader("Set-Cookie", serialize(name, value, options));
};

const cookiesMiddleware = (handler: any) => (req: NextApiRequest, res: NextApiResponse) => {
	// @ts-ignore
	res.cookie = (name: string, value: string, options?: CookieSerializeOptions) =>
		setCookie(res, name, value, options);

	return handler(req, res);
};

export const getAuthentication = async (cookieStr: string): Promise<ICookieAuthentication | null> => {
	if (!cookieStr) {
		return null;
	}
	const cookie = parse(cookieStr);

	console.log("Cookie", cookie);


	const {
		[CookieKeys.USERNAME]: username,
		[CookieKeys.AUTHENTICATION_ID]: authenticationId,
		[CookieKeys.AUTHENTICATION_TIME]: authenticationTime
	} = cookie;

	if (!authenticationId) {
		return null;
	}

	return {
		username,
		authenticationId,
		authenticationTime: parseInt(authenticationTime)
	};
};

export default cookiesMiddleware;
