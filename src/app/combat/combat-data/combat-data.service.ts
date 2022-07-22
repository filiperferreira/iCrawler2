import { Injectable } from '@angular/core';
import { Enemy } from 'src/app/dungeon/dungeon-data/dungeon-data';

@Injectable({
  providedIn: 'root'
})
export class CombatDataService {
  enemy?: Enemy

  constructor() { }
}
