import { hashSync, compareSync } from "bcrypt";

const salt = 10;

export const encrypt = (str: string): string => hashSync(str, salt);

export const isPasswordMatched = (plainPassword: string, hashedPassword: string): boolean =>
	compareSync(plainPassword, hashedPassword);
