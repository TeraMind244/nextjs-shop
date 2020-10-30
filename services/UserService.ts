import { IUser } from "../interfaces/User";
import { getDataFromJSON, writeDataToJSON } from "./FileService";

export const getAllUsers = (): IUser[] => {
	return getDataFromJSON("private/users.json").users as IUser[];
};

export const addUser = (user: IUser): void => {
	const allUsers = getAllUsers();
	writeDataToJSON("private/users.json", [...allUsers, user]);
};
