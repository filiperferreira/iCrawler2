import { Component, Input, OnInit } from '@angular/core';
import { DungeonDataService } from '../dungeon/dungeon-data/dungeon-data.service';
import { InventoryDataService } from '../inventory/inventory-data/inventory-data.service';
import { Resource, Stat } from '../player/player-data/player-data';
import { PlayerDataService } from '../player/player-data/player-data.service';
import { CombatDataService } from './combat-data/combat-data.service';

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.css']
})
export class CombatComponent implements OnInit {  
  @Input() autoAttack = false;

  constructor(
    private combatData: CombatDataService,
    private dungeonData: DungeonDataService,
    private playerData: PlayerDataService,
    private inventoryData: InventoryDataService
  ) { }

  ngOnInit(): void {}

  getEnemyName(): string {
    return this.combatData.getEnemyName();
  }
  getEnemyHealth(): Resource {
    return this.combatData.getEnemyHealth();
  }
  getEnemyStats(): Stat[] {
    return this.combatData.getEnemyStats();
  }

  attack(): void {
    this.combatData.combat(this.playerData, this.dungeonData, this.inventoryData);
  }

  isInCombat(): boolean {
    return this.dungeonData.isInCombat();
  }
  endCombat(): void {
    this.combatData.resetHp();
    this.dungeonData.setInCombat(false);
  }

  seconds: number = 1;
  action = setInterval(() => {
    if (this.isInCombat() && this.autoAttack) {
      this.attack();
    }
  }, this.seconds * 1000);
}
