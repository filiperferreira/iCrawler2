import { Component, OnInit } from '@angular/core';
import { DungeonDataService } from '../dungeon/dungeon-data/dungeon-data.service';
import { Resource } from '../player/player-data/player-data';
import { CombatDataService } from './combat-data/combat-data.service';

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.css']
})
export class CombatComponent implements OnInit {  
  constructor(private combatData: CombatDataService, private dungeonData: DungeonDataService) { }

  ngOnInit(): void {}

  getEnemyName(): string {
    return this.combatData.getEnemyName();
  }
  getEnemyHealth(): Resource {
    return this.combatData.getEnemyHealth();
  }

  isInCombat(): boolean {
    return this.dungeonData.isInCombat();
  }
  endCombat(): void {
    this.dungeonData.setInCombat(false);
  }
}
