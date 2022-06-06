import { User } from '@southside-server/modules/database/entities/User';
import { Player } from 'alt-server';
import { ScriptEvents } from '@southside-shared/constants/ScriptEvents';
import { Lobby } from '@southside-server/modules/game-logic/models/lobby';

export class PlayerExtend extends Player {
  currentVehicle: number | null = null;

  user: User;

  killStreak: number = 0;

  isLoggedIn: boolean = false;

  lobby: Lobby = null;

  public emitGui(eventName: string, ...args: any[]) {
    this.emit(ScriptEvents.Webview.EmitToGuiFromServer, eventName, args);
  }

  public updateGuiStats() {
    this.emit(ScriptEvents.Stats.UpdateStats, this.user.stats);
  }

  public sendNotification(title: string, text: string): void {
    this.emit(ScriptEvents.Notification.Receive, { title, text });
  }

  public freeze(toggle: boolean): void {
    this.emit(ScriptEvents.Control.ToggleGameControls, toggle);
  }
}
