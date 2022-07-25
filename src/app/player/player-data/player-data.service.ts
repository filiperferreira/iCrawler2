import { Injectable} from '@angular/core';
import { Difficulty } from 'src/app/dungeon/dungeon-data/dungeon-data';
import { LogWindowDataService } from 'src/app/log-window/log-window-data/log-window-data.service';
import { Player, PLAYER, Stat } from './player-data';

@Injectable({
  providedIn: 'root'
})
export class PlayerDataService {
  player: Player

  constructor(private messageLog: LogWindowDataService) { 
    this.player = PLAYER;
  }

  getPlayerData(): Player {
    return this.player;
  }
  getCombatStats(): Stat[] {
    return this.player.combat_stats;
  }

  gainExp(skill: number, difficulty: number): void {
    var exp_ratio = 1/60;
    
    this.player.life_skills[skill].exp += exp_ratio * difficulty;
    while (this.player.life_skills[skill].exp >= this.player.life_skills[skill].expToLevel) {
      this.player.life_skills[skill].exp -= this.player.life_skills[skill].expToLevel;
      this.player.life_skills[skill].level += 1;
      this.player.life_skills[skill].expToLevel = Math.pow(this.player.life_skills[skill].expToLevel, 1.1);
      this.messageLog.addMessageToLog(
        this.player.life_skills[skill].id +
        " leveled up to " +
        this.player.life_skills[skill].level + ".");
    }
  }

  restoreHP(value: number): void {
    this.player.health.current += value;
    if (this.player.health.current > this.player.health.max) {
      this.player.health.current = this.player.health.max;
    }
  }

  calculateProgress(usedSkills: Difficulty[]): number {
    var progress: number = 1;

    for (var usedSkill of usedSkills) {
      progress *= Math.pow(
        this.player.life_skills[usedSkill.skill].level / usedSkill.difficulty,
        usedSkill.weight
      );
    }

    return progress;
  }
}
