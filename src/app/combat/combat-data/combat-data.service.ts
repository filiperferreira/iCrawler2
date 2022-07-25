import { ResourceLoader } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Enemy } from 'src/app/dungeon/dungeon-data/dungeon-data';
import { LogWindowDataService } from 'src/app/log-window/log-window-data/log-window-data.service';
import { Resource, Stat } from 'src/app/player/player-data/player-data';
import { PlayerDataService } from 'src/app/player/player-data/player-data.service';

@Injectable({
  providedIn: 'root'
})
export class CombatDataService {
  enemy: Enemy
  placeholderEnemy: Enemy = {
    name: "Dummy",
    health: {current: 1, min: 0, max: 1},
    stats: [
      {id: "Attack", level: 1},
      {id: "Defense", level: 1},
      {id: "Speed", level: 1}
  ],
    skills: [{
        name: "Oops",
        action: function() {
            console.log("This shouldn't happen.");
            return 0;
        }
    }]
  }

  constructor(private messageLog: LogWindowDataService) { 
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

  getEnemyStats(): Stat[] {
    return this.enemy.stats;
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

  combat(player: PlayerDataService): void {
    var playerStats = player.getCombatStats();
    if (playerStats[2].level >= this.enemy.stats[2].level) {
      this.playerAttack(playerStats);
      this.enemyAttack(playerStats);
    }
    else {
      this.enemyAttack(playerStats);
      this.playerAttack(playerStats);
    }
  }

  enemyAttack(playerStats: Stat[]): void {
    var hitDifferential = (this.enemy.stats[2].level - playerStats[2].level)/10;
    var hitChance = Math.random();
    var usedSkill = Math.floor(Math.random() * this.enemy.skills.length);

    if (hitChance <= 0.8 + hitDifferential) {
      var damage = this.enemy.skills[usedSkill].action(playerStats, this.enemy.stats);
      if (damage <= 0) {
        this.messageLog.addMessageToLog(
          "You blocked the " + this.enemy.name + "'s attack."
        );
      }
      else {
        this.messageLog.addMessageToLog(
          "The " + this.enemy.name + "'s " +
          this.enemy.skills[usedSkill].name + " did " +
          damage.toString() + " damage to you."
        );
      }
    }
    else {
      this.messageLog.addMessageToLog(
        "You dodged the " + this.enemy.name + "'s " + this.enemy.skills[usedSkill].name + "."
      );
    }
  }

  playerAttack(playerStats: Stat[]): void {
    var hitDifferential = (playerStats[2].level - this.enemy.stats[2].level)/10;
    var hitChance = Math.random();

    if (hitChance <= 0.8 + hitDifferential) {
      var damageDifferential = Math.random() * 0.4 + 0.9;
      var playerDamage = playerStats[0].level * damageDifferential;
      var enemyDefense = this.enemy.stats[1].level * (Math.random() * 0.4 + 0.9);
      playerDamage -= enemyDefense;
      playerDamage = Math.round(playerDamage);
      if (playerDamage <= 0) {
        this.messageLog.addMessageToLog(
          "The " + this.enemy.name + " blocked your attack."
        );
      }
      else {
        this.messageLog.addMessageToLog(
          "You did " + playerDamage.toString() + " damage to the " + this.enemy.name + "."
        );
      }
    }
    else {
      this.messageLog.addMessageToLog("The " + this.enemy.name + " dodged your attack.");
    }
  }
}
