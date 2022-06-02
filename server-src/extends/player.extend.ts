import { Player } from "alt-server";
import { User } from "./../modules/database/entities/User";
export class PlayerExtend extends Player {
	currentVehicle: number | null = null;

	user: User;
}
