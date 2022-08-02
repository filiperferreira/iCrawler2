import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InventoryDataService } from '../inventory/inventory-data/inventory-data.service';
import { PlayerDataService } from '../player/player-data/player-data.service';
import { Upgrade } from './upgrade-data/upgrade-data';
import { UpgradeDataService } from './upgrade-data/upgrade-data.service';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {
  @Output() initEvent = new EventEmitter<string[]>();

  subtitle: string = "";
  title: string = "Upgrades";

  constructor(
    private upgradeData: UpgradeDataService,
    private inventoryData: InventoryDataService,
    private playerData: PlayerDataService
  ) { }

  ngOnInit(): void {
    this.initEvent.emit([this.subtitle, this.title]);
  }

  listUpgrades(): Upgrade[] {
    return this.upgradeData.upgrades;
  }

  buyUpgrade(upgrade: Upgrade): void {
    this.upgradeData.buyUpgrade(this.inventoryData, upgrade, this.playerData);
  }
}
