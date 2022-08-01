import { Injectable } from '@angular/core';
import { Enemy } from 'src/app/dungeon/dungeon-data/dungeon-data';
import { DungeonDataService } from 'src/app/dungeon/dungeon-data/dungeon-data.service';
import { InventoryDataService } from 'src/app/inventory/inventory-data/inventory-data.service';
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

  constructor(
    private messageLog: LogWindowDataService,
  ) { 
    this.enemy = this.placeholderEnemy;
  }

  loadCombat(savedEnemy: Enemy, dungeonData: DungeonDataService) {
    var enemyName = savedEnemy.name;
    this.enemy = dungeonData.getEnemyByName(enemyName);
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

  resetHp(): void {
    this.enemy.health.current = this.enemy.health.max;
  }

  enemyTakeDamage(damage: number): boolean {
    this.enemy.health.current -= damage;
    if (this.enemy.health.current <= 0) {
      this.enemy.health.current = 0;
      this.messageLog.addMessageToLog("You defeated the " + this.enemy.name + ".");
      return true;
    }
    return false;
  }

  combat(
    player: PlayerDataService,
    dungeon: DungeonDataService,
    inventory: InventoryDataService
  ): void {
    var playerStats = player.getCombatStats();
    if (playerStats[2].level >= this.enemy.stats[2].level) {
      if (!this.playerAttack(player)) {
        if (this.enemyAttack(player)) {
          this.resetHp();
          dungeon.setInCombat(false);
        }
      }
      else {
        this.resetHp();
        dungeon.setInCombat(false);
      }
    }
    else {
      if (!this.enemyAttack(player)) {
        if (this.playerAttack(player)) {
          this.resetHp();
          dungeon.setInCombat(false);
        }
      }
      else {
        this.resetHp();
        dungeon.setInCombat(false);
      }
    }
  }

  flee(player: PlayerDataService, dungeon: DungeonDataService): void {
    var playerSpeed = player.getCombatStats()[2].level;
    var enemySpeed = this.enemy.stats[2].level;
    var flightRoll = Math.random();

    if (flightRoll <= 0.8 + (playerSpeed - enemySpeed)/50) {
      this.messageLog.addMessageToLog("You flee from the " + this.enemy.name + ".");
      this.resetHp();
      dungeon.setInCombat(false);
    }
    else {
      this.messageLog.addMessageToLog("You fail to run away from the " + this.enemy.name + ".");
      if (this.enemyAttack(player)) {
        this.resetHp();
        dungeon.setInCombat(false);
      }
    }
  }

  calculateDamage(attacker: Stat[], defender: Stat[]): number {
      var damageDifferential = Math.random() * 0.4 + 0.9;
      var attackerDamage = attacker[0].level * damageDifferential;
      var defenderDefense = defender[1].level * (Math.random() * 0.4 + 0.9);

      attackerDamage -= defenderDefense;

      return Math.round(attackerDamage);
  }

  checkHit(attacker: Stat[], defender: Stat[]): boolean {
    var hitDifferential = (attacker[2].level - defender[2].level)/10;
    var hitChance = Math.random();

    return (hitChance <= 0.8 + hitDifferential);
  }

  enemyAttack(player: PlayerDataService): boolean {
    var playerStats = player.getCombatStats();
    var usedSkill = Math.floor(Math.random() * this.enemy.skills.length);

    if (this.checkHit(this.enemy.stats, playerStats)) {
      var damage = this.enemy.skills[usedSkill].action(playerStats, this);
      if (damage <= 0) {
        this.messageLog.addMessageToLog(
          "You blocked the " + this.enemy.name + "'s " +
          this.enemy.skills[usedSkill].name + "."
        );
      }
      else {
        this.messageLog.addMessageToLog(
          "The " + this.enemy.name + "'s " +
          this.enemy.skills[usedSkill].name + " did " +
          damage.toString() + " damage to you."
        );
        player.gainExp(0, damage, 1);
        return player.takeDamage(damage);
      }
    }
    else {
      this.messageLog.addMessageToLog(
        "You dodged the " + this.enemy.name + "'s " + this.enemy.skills[usedSkill].name + "."
      );
    }
    return false;
  }

  playerAttack(player: PlayerDataService): boolean {
    var playerStats = player.getCombatStats();

    if (this.checkHit(playerStats, this.enemy.stats)) {
      var damage = this.calculateDamage(playerStats, this.enemy.stats);
      if (damage <= 0) {
        this.messageLog.addMessageToLog(
          "The " + this.enemy.name + " blocked your attack."
        );
      }
      else {
        this.messageLog.addMessageToLog(
          "You did " + damage.toString() + " damage to the " + this.enemy.name + "."
        );
        player.gainExp(0, damage, 1);
        return this.enemyTakeDamage(damage);
      }
    }
    else {
      this.messageLog.addMessageToLog("The " + this.enemy.name + " dodged your attack.");
    }
    return false;
  }
}
