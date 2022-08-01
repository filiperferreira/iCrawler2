import { Injectable } from '@angular/core';
import { Upgrade, UPGRADES } from './upgrade-data';

@Injectable({
  providedIn: 'root'
})
export class UpgradeDataService {
  upgrades: Upgrade[];

  constructor() {
    this.upgrades = UPGRADES;
  }
}
