import { Injectable } from '@angular/core';
import { Action, Dungeon, DUNGEON, Progress, Enemy} from './dungeon-data';
import { PlayerDataService } from 'src/app/player/player-data/player-data.service';
import { InventoryDataService } from 'src/app/inventory/inventory-data/inventory-data.service';
import { CombatDataService } from 'src/app/combat/combat-data/combat-data.service';
import { LogWindowDataService } from 'src/app/log-window/log-window-data/log-window-data.service';

@Injectable({
  providedIn: 'root'
})
export class DungeonDataService {
  dungeon: Dungeon
  inCombat: boolean = false;

  constructor(
    private playerData: PlayerDataService,
    private inventoryData: InventoryDataService,
    private combatData: CombatDataService,
    private messageLog: LogWindowDataService
  ) { 
    this.dungeon = DUNGEON;
  }

  loadDungeon(savedDungeon: Dungeon): void {
    for (var i = 0; i < savedDungeon.actionList.length; i++) {
      this.dungeon.actionList[i].active = savedDungeon.actionList[i].active;
      this.dungeon.actionList[i].progress = savedDungeon.actionList[i].progress;
    }
  }

  getDungeonData(): Dungeon {
    return this.dungeon;
  }

  getExploration(): Progress {
    return this.getActionProgress(0);
  }

  getActionProgress(action: number): Progress {
    return this.dungeon.actionList[action].progress;
  }

  getEnemyByName(enemyName: string): Enemy {
    for (var enemy of this.dungeon.enemyList) {
      if (enemy.name == enemyName) {
        return enemy;
      }
    }
    return this.dungeon.enemyList[0];
  }

  setActiveAction(action?: Action): void {
    if (action != undefined) {
      this.messageLog.addMessageToLog("You started to " + action.name + ".");
    }
    this.dungeon.action = action;
  }
  getActiveAction(): void {
    if (this.dungeon.action != undefined) {
      return this.dungeon.action.action(
        this, this.playerData, this.inventoryData, this.combatData, this.messageLog
      );
    }
  }

  setInCombat(value: boolean): void {
    if (value == true) {
      var enemyList = this.dungeon.enemyList;
      var enemyRoll = Math.floor(Math.random() * enemyList.length);
      this.combatData.setEnemy(this.dungeon.enemyList[enemyRoll]);
    }
    else {
      this.combatData.setEnemy(undefined);
    }
    this.inCombat = value;
  }
  isInCombat(): boolean {
    return this.inCombat;
  }

  getEncounterChance(): number {
    return this.dungeon.encounterChance;
  }

  activateAction(action: number): void {
    this.dungeon.actionList[action].active = true;
  }
  deactivateAction(action: number): void {
    this.dungeon.actionList[action].active = false;
  }

  getActionList(unlocked = false): Action[] {
    if (unlocked) {
      var unlockedActions: Action[] = [];

      for (var action of this.dungeon.actionList) {
        if (action.unlockedAt <= this.getExploration().current && action.active) {
          unlockedActions.push(action);
        }
      }

      return unlockedActions;
    }
    return this.dungeon.actionList;
  }

  progressAction(action: number, amount: number): boolean {
    this.dungeon.actionList[action].progress.current += amount;
    if (this.dungeon.actionList[action].progress.current >= this.dungeon.actionList[action].progress.max) {
      if (this.dungeon.actionList[action].repeatable) {
        this.dungeon.actionList[action].progress.current = 0;
      }
      else {
        this.dungeon.actionList[action].progress.current = this.dungeon.actionList[action].progress.max;
        this.deactivateAction(action);
      }
      return true;
    }
    return false;
  }

  isFullyExplored(): boolean {
    return this.getExploration().current >= this.getExploration().max;
  }

  encounterRoll(chance: number): boolean {
    var roll = Math.random() * 100;
    if (roll <= chance) {
      return true;
    }
    return false;
  }
}
