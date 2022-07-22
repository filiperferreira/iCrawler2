import { Component, OnInit } from '@angular/core';
import { CombatDataService } from './combat-data/combat-data.service';

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.css']
})
export class CombatComponent implements OnInit {  
  constructor(private combatData: CombatDataService) { }

  ngOnInit(): void {}
}
