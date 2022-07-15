import { Component, OnInit } from '@angular/core';
import { Action, Dungeon } from './dungeon-data/dungeon-data';
import { DungeonDataService } from './dungeon-data/dungeon-data.service';

@Component({
  selector: 'app-dungeon',
  templateUrl: './dungeon.component.html',
  styleUrls: ['./dungeon.component.css']
})
export class DungeonComponent implements OnInit {
  constructor(
    private dungeonData: DungeonDataService) { }

  ngOnInit(): void {}

  getDungeon(): Dungeon {
    return this.dungeonData.getDungeonData();
  }

  getUnlockedActions(): Action[] {
    return this.dungeonData.getActionList(true);
  }

  setAction(action: number) {
    this.dungeonData.setActiveAction(action);
  }

  performAction(action: void) {}

  seconds: number = 1;
  action = setInterval(() => {
    if (this.getDungeon().action != -1) {
      this.performAction(this.dungeonData.getActiveAction());
    }
  }, this.seconds * 1000);
}
