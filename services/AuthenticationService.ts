import { IUser } from "../interfaces/User";
import { getAllUsers } from "./UserService";
import { encrypt } from "./EncryptionService";

export const login = ({ username, password }: IUser): boolean => {
	return Boolean(
		getAllUsers().filter(user => user.username === username && user.password === encrypt(password)).length
	);
};
