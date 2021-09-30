import { Mission } from "./Mission";
import { Rocket } from "./Rocket";

export class Launch {
	id: string;
	site: string;
	mission: Mission;
	rocket: Rocket;
	isBooked: boolean;
}
