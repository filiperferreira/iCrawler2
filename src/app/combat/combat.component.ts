import { Component, OnInit } from '@angular/core';
import { DungeonDataService } from '../dungeon/dungeon-data/dungeon-data.service';
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

  isInCombat(): boolean {
    return this.dungeonData.isInCombat();
  }
  endCombat(): void {
    this.dungeonData.setInCombat(false);
  }
}
