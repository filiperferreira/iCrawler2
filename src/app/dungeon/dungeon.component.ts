import { Component, OnInit } from '@angular/core';
import { PlayerDataService } from '../player/player-data/player-data.service';
import { Action, Dungeon, Progress } from './dungeon-data/dungeon-data';
import { DungeonDataService } from './dungeon-data/dungeon-data.service';

@Component({
  selector: 'app-dungeon',
  templateUrl: './dungeon.component.html',
  styleUrls: ['./dungeon.component.css']
})
export class DungeonComponent implements OnInit {
  constructor(
    private dungeonData: DungeonDataService,
    private playerData: PlayerDataService
  ) { }

  ngOnInit(): void {}

  getDungeon(): Dungeon {
    return this.dungeonData.getDungeonData();
  }

  getExploration(): Progress {
    return this.dungeonData.getExploration();
  }

  getActionProgress(action: number): Progress {
    return this.dungeonData.getActionProgress(action);
  }

  getUnlockedActions(): Action[] {
    return this.dungeonData.getActionList(true);
  }

  isInCombat(): boolean {
    return this.dungeonData.isInCombat();
  }

  setAction(action?: Action) {
    this.dungeonData.setActiveAction(action);
  }

  performAction(action: void) {}

  seconds: number = 1/60;
  action = setInterval(() => {
    if (this.getDungeon().action != undefined) {
      this.performAction(this.dungeonData.getActiveAction());
    }
    else if (!this.isInCombat()) {
      this.playerData.restoreHP(1 * this.seconds);
    }
  }, this.seconds * 1000);
}
