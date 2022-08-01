import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  constructor(private upgradeData: UpgradeDataService) { }

  ngOnInit(): void {
    this.initEvent.emit([this.subtitle, this.title]);
  }

  listUpgrades(): Upgrade[] {
    return this.upgradeData.upgrades;
  }
}
