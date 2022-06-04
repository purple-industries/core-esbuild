import { User } from '@southside-server/modules/database/entities/User';
import { Player } from 'alt-server';

export class PlayerExtend extends Player {
	currentVehicle: number | null = null;

	user: User;

	killStreak: number = 0;
}
