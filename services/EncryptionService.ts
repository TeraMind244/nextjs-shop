import { genSaltSync, hashSync } from "bcrypt";

const salt = genSaltSync();

export const encrypt = (str: string) => hashSync(str, salt);
