import { User } from '@southside-server/modules/database/entities/User';
import { Player } from 'alt-server';
import { ScriptEvents } from '@southside-shared/constants/ScriptEvents';

export class PlayerExtend extends Player {
  currentVehicle: number | null = null;

  user: User;

  killStreak: number = 0;

  isLoggedIn: boolean = false;

  public emitGui(eventName: string, ...args: any[]) {
    this.emit(ScriptEvents.Webview.EmitToGuiFromServer, eventName, args);
  }
}
