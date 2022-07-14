import { Injectable } from '@angular/core';
import { Player } from 'src/app/player/player-data/player-data';
import { Action, Dungeon, DUNGEON } from './dungeon-data';

@Injectable({
  providedIn: 'root'
})
export class DungeonDataService {
  dungeon: Dungeon

  constructor() { 
    this.dungeon = DUNGEON;
  }

  getDungeonData() {
    return this.dungeon;
  }

  setActiveAction(action: string) {
    this.dungeon.action = action;
  }
  getActiveAction() {
    return this.dungeon.action;
  }

  getActionList(unlocked = false) {
    if (unlocked) {
      var unlockedActions: Action[] = [];

      for (var action of this.dungeon.action_list) {
        if (action.unlocked) {
          unlockedActions.push(action);
        }
      }

      return unlockedActions;
    }
    return this.dungeon.action_list;
  }

  explore(player: Player) {
    if (!this.isFullyExplored()) {
      this.dungeon.exploration.current += 1;
    }
  }

  isFullyExplored(): boolean {
    return this.dungeon.exploration.current >= this.dungeon.exploration.max;
  }
}
