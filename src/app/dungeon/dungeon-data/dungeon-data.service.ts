import { Injectable } from '@angular/core';
import { Action, Dungeon, DUNGEON } from './dungeon-data';
import { PlayerDataService } from 'src/app/player/player-data/player-data.service';

@Injectable({
  providedIn: 'root'
})
export class DungeonDataService {
  dungeon: Dungeon

  constructor(private playerData: PlayerDataService) { 
    this.dungeon = DUNGEON;
  }

  getDungeonData() {
    return this.dungeon;
  }

  setActiveAction(action: number) {
    this.dungeon.action = action;
  }
  getActiveAction(): void {
    return this.dungeon.action_list[this.dungeon.action].action(
      this, this.playerData
    );
  }

  getActionList(unlocked = false) {
    if (unlocked) {
      var unlockedActions: Action[] = [];

      for (var action of this.dungeon.action_list) {
        if (action.unlockedAt <= this.dungeon.exploration.current) {
          unlockedActions.push(action);
        }
      }

      return unlockedActions;
    }
    return this.dungeon.action_list;
  }

  explore(amount: number) {
    this.dungeon.exploration.current += amount;
    if (this.dungeon.exploration.current > this.dungeon.exploration.max) {
      this.dungeon.exploration.current = this.dungeon.exploration.max;
    }
  }

  isFullyExplored(): boolean {
    return this.dungeon.exploration.current >= this.dungeon.exploration.max;
  }
}
