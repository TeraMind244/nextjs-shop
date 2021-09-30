import fs from "fs-extra";
import path from "path";

export const getDataFromJSON = async <T = any>(fileName: string): Promise<T> =>
	fs.readJSONSync(path.join(process.cwd(), "data", ...fileName.split("/")));

export const writeDataToJSON = async <T = any>(fileName: string, data: T): Promise<void> =>
	fs.writeFileSync(path.join(process.cwd(), "data", ...fileName.split("/")), JSON.stringify(data, null, "\t"));
