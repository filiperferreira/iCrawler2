import { Injectable} from '@angular/core';
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
}
