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

  deactivateAction(action: number): void {
    this.dungeon.action_list[action].active = false;
  }

  getActionList(unlocked = false): Action[] {
    if (unlocked) {
      var unlockedActions: Action[] = [];

      for (var action of this.dungeon.action_list) {
        if (action.unlockedAt <= this.getExploration().current && action.active) {
          unlockedActions.push(action);
        }
      }

      return unlockedActions;
    }
    return this.dungeon.action_list;
  }

  progressAction(action: number, amount: number): boolean {
    this.dungeon.action_list[action].progress.current += amount;
    if (this.dungeon.action_list[action].progress.current >= this.dungeon.action_list[action].progress.max) {
      if (this.dungeon.action_list[action].repeatable) {
        this.dungeon.action_list[action].progress.current = 0;
      }
      else {
        this.dungeon.action_list[action].progress.current = this.dungeon.action_list[action].progress.max;
        this.deactivateAction(action);
      }
      return true;
    }
    return false;
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
