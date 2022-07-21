import { Injectable} from '@angular/core';
import { tick } from '@angular/core/testing';
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
  }

  restoreHP(value: number) {
    this.player.health.current += value;
    if (this.player.health.current > this.player.health.max) {
      this.player.health.current = this.player.health.max;
    }
  }
}
