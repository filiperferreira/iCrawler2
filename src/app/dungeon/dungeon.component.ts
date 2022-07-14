import { Component, OnInit } from '@angular/core';
import { Action, Dungeon } from './dungeon-data/dungeon-data';
import { DungeonDataService } from './dungeon-data/dungeon-data.service';
import { PlayerDataService } from '../player/player-data/player-data.service';

@Component({
  selector: 'app-dungeon',
  templateUrl: './dungeon.component.html',
  styleUrls: ['./dungeon.component.css']
})
export class DungeonComponent implements OnInit {
  constructor(
    private dungeonData: DungeonDataService,
    private playerData: PlayerDataService) { }

  ngOnInit(): void {}

  getDungeon(): Dungeon {
    return this.dungeonData.getDungeonData();
  }

  getUnlockedActions(): Action[] {
    return this.dungeonData.getActionList(true);
  }

  setAction(action: string) {
    this.dungeonData.setActiveAction(action);
  }

  performAction(action: string) {
    switch (action) {
      case "Explore": {
        this.dungeonData.explore(this.playerData.getPlayerData());
        this.playerData.gainExp(3, 1);
      }
    }
  }

  seconds: number = 1;
  action = setInterval(() => {
    this.performAction(this.dungeonData.getActiveAction());
  }, this.seconds * 1000);
}
