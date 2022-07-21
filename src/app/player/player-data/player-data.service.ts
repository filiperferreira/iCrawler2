import { Injectable} from '@angular/core';
import { tick } from '@angular/core/testing';
import { Difficulty } from 'src/app/dungeon/dungeon-data/dungeon-data';
import { Player, PLAYER } from './player-data';

@Injectable({
  providedIn: 'root'
})
export class PlayerDataService {
  player: Player

  constructor() { 
    this.player = PLAYER;
  }

  getPlayerData() {
    return this.player;
  }

  gainExp(stat: number, amount: number) {
    this.player.stats[stat].exp += amount;
    while (this.player.stats[stat].exp >= this.player.stats[stat].expToLevel) {
      this.player.stats[stat].exp -= this.player.stats[stat].expToLevel;
      this.player.stats[stat].level += 1;
      this.player.stats[stat].expToLevel = Math.pow(this.player.stats[stat].expToLevel, 1.1);
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

    for (var pair of usedSkills) {
      progress *= Math.pow(this.player.stats[pair.skill].level / pair.difficulty, pair.weight);
    }

    return progress;
  }
}
