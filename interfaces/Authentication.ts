export interface IAuthentication {
	[username: string]: {
		authenticationId: string;
		authenticationTime: number;
	};
}
