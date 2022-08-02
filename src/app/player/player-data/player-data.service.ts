import { Injectable} from '@angular/core';
import { Difficulty } from 'src/app/dungeon/dungeon-data/dungeon-data';
import { LogWindowDataService } from 'src/app/log-window/log-window-data/log-window-data.service';
import { UpgradeDataService } from 'src/app/upgrade/upgrade-data/upgrade-data.service';
import { Player, PLAYER, Stat } from './player-data';

@Injectable({
  providedIn: 'root'
})
export class PlayerDataService {
  player: Player

  constructor(
    private messageLog: LogWindowDataService,
    private upgradeData: UpgradeDataService
  ) { 
    this.player = PLAYER;
  }

  loadPlayer(savedPlayer: Player) {
    this.player.name = savedPlayer.name;
    this.player.health = savedPlayer.health;
    this.player.mana = savedPlayer.mana;
    for (var i = 0; i < savedPlayer.lifeSkills.length; i++) {
      this.player.lifeSkills[i] = savedPlayer.lifeSkills[i];
    }
    for (var i = 0; i < savedPlayer.combatStats.length; i++) {
      this.player.combatStats[i] = savedPlayer.combatStats[i];
    }
    this.player.unallocatedStats = savedPlayer.unallocatedStats;
  }

  getPlayerData(): Player {
    return this.player;
  }
  getCombatStats(): Stat[] {
    return this.player.combatStats;
  }

  hasUnallocatedStats(): boolean {
    if (this.player.unallocatedStats > 0) {
      return true;
    }
    return false;
  }
  levelStat(stat: Stat): void {
    stat.level += 1;
    this.player.unallocatedStats -= 1;
  }

  upgradeMaxHP(multiplier: number): void {
    this.player.health.max = 100 * multiplier;
  }

  gainExp(skill: number, difficulty: number, expRatio: number): void {
    this.player.lifeSkills[skill].exp += expRatio * difficulty * this.upgradeData.getExpGainMultiplier();
    while (this.player.lifeSkills[skill].exp >= this.player.lifeSkills[skill].expToLevel) {
      this.player.lifeSkills[skill].exp -= this.player.lifeSkills[skill].expToLevel;
      this.player.lifeSkills[skill].level += 1;
      this.player.lifeSkills[skill].expToLevel = Math.pow(this.player.lifeSkills[skill].expToLevel, 1.02);
      this.messageLog.addMessageToLog(
        this.player.lifeSkills[skill].id +
        " leveled up to " +
        this.player.lifeSkills[skill].level + ".");
      if (skill == 0) {
        this.player.unallocatedStats += 3;
      }
    }
  }

  takeDamage(value: number): boolean {
    this.player.health.current -= value;
    if (this.player.health.current <= 0) {
      this.player.health.current = 0;
      this.messageLog.addMessageToLog("You died.");
      return true;
    }
    return false;
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
        this.player.lifeSkills[usedSkill.skill].level / usedSkill.difficulty,
        usedSkill.weight
      );
    }

    return progress;
  }
}
