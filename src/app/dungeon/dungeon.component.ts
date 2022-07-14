import { Component, OnInit } from '@angular/core';
import { Action, Dungeon } from './dungeon-data/dungeon-data';
import { DungeonDataService } from './dungeon-data/dungeon-data.service';

@Component({
  selector: 'app-dungeon',
  templateUrl: './dungeon.component.html',
  styleUrls: ['./dungeon.component.css']
})
export class DungeonComponent implements OnInit {
  constructor(private dungeonData: DungeonDataService) { }

  ngOnInit(): void {}

  getDungeon(): Dungeon {
    return this.dungeonData.getDungeonData();
  }

  getUnlockedActions(): Action[] {
    var unlockedActions: Action[] = [];

    for (var action of this.dungeonData.getActionList()) {
      if (action.unlocked) {
        unlockedActions.push(action);
      }
    }

    return unlockedActions;
  }

  setAction(action: string) {
    this.dungeonData.setActiveAction(action);
  }

  performAction(action: string) {
    switch (action) {
      case "Explore": {
        this.dungeonData.explore(1);
      }
    }
  }

  seconds: number = 1;
  action = setInterval(() => {
    this.performAction(this.dungeonData.getActiveAction());
  }, this.seconds * 1000);
}
