import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Player, Skill, Stat } from './player-data/player-data';
import { PlayerDataService } from './player-data/player-data.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Output() initEvent = new EventEmitter<string[]>();

  subtitle: string = "Player Info";
  title: string = this.getPlayer().name;

  constructor(private playerData: PlayerDataService) { }

  ngOnInit(): void {
    this.initEvent.emit([this.subtitle, this.title]);
  }

  getPlayer(): Player {
    return this.playerData.getPlayerData();
  }
  isSkillActivated(skill: Skill): boolean {
    if (skill.level > 1 || skill.exp > 0) {
      return true;
    }
    return false;
  }

  hasUnallocatedStats(): boolean {
    return this.playerData.hasUnallocatedStats();
  }
  levelStat(stat: Stat): void {
    this.playerData.levelStat(stat);
  }
}
