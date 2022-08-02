import { Injectable } from '@angular/core';
import { InventoryDataService } from 'src/app/inventory/inventory-data/inventory-data.service';
import { PlayerDataService } from 'src/app/player/player-data/player-data.service';
import { Upgrade, UPGRADES } from './upgrade-data';

@Injectable({
  providedIn: 'root'
})
export class UpgradeDataService {
  upgrades: Upgrade[];

  constructor() {
    this.upgrades = UPGRADES;
  }

  loadUpgrades(savedUpgrades: Upgrade[]): void {
    for (var i = 0; i < savedUpgrades.length; i++) {
      this.upgrades[i].cost = savedUpgrades[i].cost;
      this.upgrades[i].value = savedUpgrades[i].value;
    }
  }

  buyUpgrade(
    inventory: InventoryDataService,
    upgrade: Upgrade,
    player: PlayerDataService): void
  {
    if (inventory.inventory.items[0].amount >= upgrade.cost) {
      inventory.inventory.items[0].amount -= upgrade.cost;
      upgrade.cost = Math.round(Math.pow(upgrade.cost, 1.01));
    }
    switch (upgrade.name) {
      case "EXP Gain":
        upgrade.value += 0.1;
        break;
      case "Max HP":
        upgrade.value += 0.5;
        player.upgradeMaxHP(upgrade.value);
        break;
    }
  }

  getExpGainMultiplier(): number {
    return this.upgrades[0].value;
  }
}
