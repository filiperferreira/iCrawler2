import { ResourceLoader } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Enemy } from 'src/app/dungeon/dungeon-data/dungeon-data';
import { Resource } from 'src/app/player/player-data/player-data';

@Injectable({
  providedIn: 'root'
})
export class CombatDataService {
  enemy: Enemy
  placeholderEnemy: Enemy = {
    name: "Boar",
    health: {current: 25, min: 0, max: 25},
    stats: [10, 3, 4],
    skills: [{
        name: "Charge",
        action: function() {
            console.log("Used " + this.name);
        }
    }]
  }

  constructor() { 
    this.enemy = this.placeholderEnemy;
  }

  setEnemy(enemy?: Enemy) {
    if (enemy == undefined) {
      this.enemy = this.placeholderEnemy;
    }
    else {
      this.enemy = enemy;
    }
  }

  getEnemyName(): string {
    if (this.enemy != undefined) {
      return this.enemy.name;
    }
    return "";
  }
  getEnemyHealth(): Resource {
    return this.enemy.health;
  }
}
