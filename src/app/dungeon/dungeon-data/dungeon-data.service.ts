import { Injectable } from '@angular/core';
import { Action, Dungeon, DUNGEON, Progress } from './dungeon-data';
import { PlayerDataService } from 'src/app/player/player-data/player-data.service';
import { InventoryDataService } from 'src/app/inventory/inventory-data/inventory-data.service';

@Injectable({
  providedIn: 'root'
})
export class DungeonDataService {
  dungeon: Dungeon

  constructor(
    private playerData: PlayerDataService,
    private inventoryData: InventoryDataService) { 
      this.dungeon = DUNGEON;
    }

  getDungeonData(): Dungeon {
    return this.dungeon;
  }

  getExploration(): Progress {
    return this.getActionProgress(0);
  }

  getActionProgress(action: number): Progress {
    return this.dungeon.action_list[action].progress;
  }

  setActiveAction(action?: Action): void {
    this.dungeon.action = action;
  }
  getActiveAction(): void {
    if (this.dungeon.action != undefined) {
      return this.dungeon.action.action(
        this, this.playerData, this.inventoryData
      );
    }
  }

  getActionList(unlocked = false): Action[] {
    if (unlocked) {
      var unlockedActions: Action[] = [];

      for (var action of this.dungeon.action_list) {
        if (action.unlockedAt <= this.getExploration().current) {
          unlockedActions.push(action);
        }
      }

      return unlockedActions;
    }
    return this.dungeon.action_list;
  }

  explore(amount: number): void {
    this.getExploration().current += amount;
    if (this.getExploration().current > this.getExploration().max) {
      this.getExploration().current = this.getExploration().max;
    }
  }

  isFullyExplored(): boolean {
    return this.getExploration().current >= this.getExploration().max;
  }
}
