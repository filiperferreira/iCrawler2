import { Injectable } from '@angular/core';
import { Dungeon, DUNGEON } from './dungeon-data';

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

  getActionList() {
    return this.dungeon.action_list;
  }

  explore(value: number) {
    if (!this.isFullyExplored()) {
      this.dungeon.exploration.current += value;
    }
  }

  isFullyExplored(): boolean {
    return this.dungeon.exploration.current >= this.dungeon.exploration.max;
  }
}
