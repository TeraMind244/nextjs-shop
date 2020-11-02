import { IUser } from "../interfaces/User";
import { DataPath } from "../utils/Constants";
import { uuid } from "../utils/Utils";
import { encrypt, isPasswordMatched } from "./EncryptionService";
import { getDataFromJSON, writeDataToJSON } from "./FileService";
import { getAllUsers } from "./UserService";

const expiredDuration /* One day */ = 24 * 3600 * 1000;

export const login = ({ username, password }: IUser): boolean => {
	const matchedUser = getAllUsers().find(user => user.username === username);
	const loginSucess = isPasswordMatched(password, matchedUser.password);
	if (loginSucess) {
		addOrRenewAuthentication(username, uuid());
	}
	return loginSucess;
};

export const addOrRenewAuthentication = (username: string, authenticationId: string): void => {
	const authenticationEntries = getAllAuthenticationEntries();
	authenticationEntries[username] = {
		authenticationId,
		authenticationTime: Date.now()
	};
	writeDataToJSON(DataPath.AUTHENTICATION, authenticationEntries);
};

const getAllAuthenticationEntries = () => {
	const allAuthenticationEntries = getDataFromJSON(DataPath.AUTHENTICATION);
	const newAuthenticationEntries = [];
	Object.keys(allAuthenticationEntries).forEach(username => {
		if (!isAuthenticationExpired(parseInt(allAuthenticationEntries[username].authenticationTime))) {
			newAuthenticationEntries[username] = {
				...allAuthenticationEntries[username]
			};
		}
	});
	return newAuthenticationEntries;
};

export const isAuthenticationExpired = (saved: number): boolean => Date.now() - saved > expiredDuration;
