import { User } from '@southside-server/modules/database/entities/User';
import { Lobby } from '@southside-server/modules/game-logic/models/lobby';

export interface PlayerInterface {
  currentVehicle: number | null;

  user: User;

  killStreak: number;

  isLoggedIn: boolean;

  lobby: Lobby;

  emitGui(eventName: string, ...args: any[]);

  updateGuiStats(): void;

  sendNotification(title: string, text: string): void;

  freeze(toggle: boolean): void;

  /* 	sendNotifyWithImage(
    message: string,
    title: string,
    subtitle: string,
    notifyImage: any,
    imageType: number,
    bgColor: number,
    durationMultiplier: number
  ): void;

  sendNotify(message: string): void;

  emitClient(eventName: string, ...args: any[]): void; */
}
