import { Launch } from "./Launch";

export class User {
	id: string;
	email: string;
	trips: Launch[];
	token: string;
}
