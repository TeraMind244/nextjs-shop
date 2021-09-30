import { IUser } from "../interfaces/User";
import { DataPath } from "../utils/Constants";
import { encrypt } from "./EncryptionService";
import { getDataFromJSON, writeDataToJSON } from "./FileService";

export const getAllUsers = async (): Promise<IUser[]> => {
	return await getDataFromJSON<IUser[]>(DataPath.USERS);
};

export const addUser = async ({username, password}: IUser): Promise<void> => {
	const allUsers = await getAllUsers();
	if (allUsers.find(user => user.username === username)) {
		return;
	}
	writeDataToJSON<IUser[]>(DataPath.USERS, [
		...allUsers,
		{
			username,
			password: encrypt(password)
		}
	]);
};
