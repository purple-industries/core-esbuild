import { User } from '@southside-server/modules/database/entities/User';

export interface PlayerInterface {
  currentVehicle: number | null;

  user: User;

  killStreak: number;

  isLoggedIn: boolean;

  emitGui(eventName: string, ...args: any[]);

  updateGuiStats(): void;

  sendNotification(title: string, text: string): void;

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
