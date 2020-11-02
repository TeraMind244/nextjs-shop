import fs from "fs-extra";
import path from "path";

export const getDataFromJSON = (fileName: string): any =>
	fs.readJSONSync(path.join(process.cwd(), "data", ...fileName.split("/")));

export const writeDataToJSON = (fileName: string, data: any) =>
	fs.writeFileSync(path.join(process.cwd(), "data", ...fileName.split("/")), JSON.stringify(data, null, "\t"));
