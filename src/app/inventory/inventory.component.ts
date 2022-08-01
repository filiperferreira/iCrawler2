import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InventoryDataService } from './inventory-data/inventory-data.service';
import { Item } from './inventory-data/inventory-data';
import { PlayerDataService } from '../player/player-data/player-data.service';
import { LogWindowDataService } from '../log-window/log-window-data/log-window-data.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  @Output() initEvent = new EventEmitter<string[]>();

  subtitle: string = "";
  title: string = "Inventory";

  ngOnInit(): void {
    this.initEvent.emit([this.subtitle, this.title]);
  }

  constructor(
    private inventoryData: InventoryDataService,
    private playerData: PlayerDataService,
    private messageLog: LogWindowDataService
  ) { }

  listItems(): Item[] {
    return this.inventoryData.listItems();
  }

  useItem(item: Item): void {
    this.messageLog.addMessageToLog("You consumed a " + item.name + ".");
    item.action(this.playerData, this.messageLog);
    this.inventoryData.removeItem(item, 1);
  }
}
