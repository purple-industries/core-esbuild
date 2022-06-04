import { User } from '@southside-server/modules/database/entities/User';

export interface PlayerInterface {
  currentVehicle: number | null;

  user: User;

  killStreak: number;
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
