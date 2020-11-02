import { IUser } from "../interfaces/User";
import { DataPath } from "../utils/Constants";
import { encrypt } from "./EncryptionService";
import { getDataFromJSON, writeDataToJSON } from "./FileService";

export const getAllUsers = (): IUser[] => {
	return getDataFromJSON(DataPath.USERS) as IUser[];
};

export const addUser = ({username, password}: IUser): void => {
	const allUsers = getAllUsers();
	if (allUsers.find(user => user.username === username)) {
		return;
	}
	writeDataToJSON(DataPath.USERS, [
		...allUsers,
		{
			username,
			password: encrypt(password)
		}
	]);
};
