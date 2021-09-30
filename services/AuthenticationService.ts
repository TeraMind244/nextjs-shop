import { EXPIRED_DURATION } from "../constants/Constants";
import { IAuthentication } from "../interfaces/Authentication";
import { IUser } from "../interfaces/User";
import { DataPath } from "../utils/Constants";
import { uuid } from "../utils/Utils";
import { isPasswordMatched } from "./EncryptionService";
import { getDataFromJSON, writeDataToJSON } from "./FileService";
import { getAllUsers } from "./UserService";

export const login = async ({ username, password }: IUser): Promise<string> => {
	const matchedUser = (await getAllUsers()).find(user => user.username === username);
	const loginSucess = isPasswordMatched(password, matchedUser.password);
	if (loginSucess) {
		const authenticationId = uuid()
		addOrRenewAuthentication(username, authenticationId);
		return authenticationId;
	}
	return "";
};

export const loginWithAuthenticationId = async (username: string, authenticationId: string): Promise<boolean> => {
	const allAuthenticationEntries = await getAllAuthenticationEntries();
	console.log(allAuthenticationEntries);

	const loginSuccess = allAuthenticationEntries[username]?.authenticationId === authenticationId;
	if (loginSuccess) {
		await addOrRenewAuthentication(username, authenticationId);
	}
	return loginSuccess;
}

const addOrRenewAuthentication = async (username: string, authenticationId: string): Promise<void> => {
	const authenticationEntries = await getAllAuthenticationEntries();
	authenticationEntries[username] = {
		authenticationId,
		authenticationTime: Date.now()
	};
	writeDataToJSON<IAuthentication>(DataPath.AUTHENTICATION, authenticationEntries);
};

const getAllAuthenticationEntries = async (): Promise<IAuthentication> => {
	return await getDataFromJSON<IAuthentication>(DataPath.AUTHENTICATION);
};

export const isAuthenticationExpired = (saved: number): boolean => Date.now() - saved > EXPIRED_DURATION;
