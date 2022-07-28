import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlayerDataService } from '../player/player-data/player-data.service';
import { Action, Dungeon, Progress } from './dungeon-data/dungeon-data';
import { DungeonDataService } from './dungeon-data/dungeon-data.service';

@Component({
  selector: 'app-dungeon',
  templateUrl: './dungeon.component.html',
  styleUrls: ['./dungeon.component.css']
})
export class DungeonComponent implements OnInit {
  @Output() initEvent = new EventEmitter<string[]>();
  @Output() displayEvent = new EventEmitter<boolean>();

  display: boolean = true;
  subtitle: string = "Current Area";
  title: string = this.getDungeon().name;
  
  constructor(
    private dungeonData: DungeonDataService,
    private playerData: PlayerDataService
  ) { }

  ngOnInit(): void {
    this.initEvent.emit([this.subtitle, this.title]);
  }

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

  toggleDisplay() {
    this.display = !this.display;
    this.displayEvent.emit(this.display);
  }

  seconds: number = 1/60;
  action = setInterval(() => {
    if (!this.isInCombat()) {
      if (!this.display) {
        this.toggleDisplay();
      }
      if (this.getDungeon().action != undefined) {
        this.dungeonData.getActiveAction();
      }
      else {
        this.playerData.restoreHP(1 * this.seconds);
      }
    }
    else {
      if (this.display) {
        this.toggleDisplay();
      }
    }
  }, this.seconds * 1000);
}
