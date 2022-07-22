import { Injectable} from '@angular/core';
import { Difficulty } from 'src/app/dungeon/dungeon-data/dungeon-data';
import { LogWindowDataService } from 'src/app/log-window/log-window-data/log-window-data.service';
import { Player, PLAYER } from './player-data';

@Injectable({
  providedIn: 'root'
})
export class PlayerDataService {
  player: Player

  constructor(private messageLog: LogWindowDataService) { 
    this.player = PLAYER;
  }

  getPlayerData() {
    return this.player;
  }

  gainExp(stat: number, amount: number) {
    this.player.stats[stat].exp += amount * this.player.stats[stat].level;
    while (this.player.stats[stat].exp >= this.player.stats[stat].expToLevel) {
      this.player.stats[stat].exp -= this.player.stats[stat].expToLevel;
      this.player.stats[stat].level += 1;
      this.player.stats[stat].expToLevel = Math.pow(this.player.stats[stat].expToLevel, 1.1);
      this.messageLog.addMessageToLog(
        this.player.stats[stat].id +
        " leveled up to " +
        this.player.stats[stat].level + ".");
    }
  }

  restoreHP(value: number) {
    this.player.health.current += value;
    if (this.player.health.current > this.player.health.max) {
      this.player.health.current = this.player.health.max;
    }
  }

  calculateProgress(usedSkills: Difficulty[]): number {
    var progress: number = 1;

    for (var usedSkill of usedSkills) {
      progress *= Math.pow(
        this.player.stats[usedSkill.skill].level / usedSkill.difficulty,
        usedSkill.weight
      );
    }

    return progress;
  }
}
