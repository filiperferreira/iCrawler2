import { Component, OnInit } from '@angular/core';
import { InventoryDataService } from './inventory-data/inventory-data.service';
import { Item } from './inventory-data/inventory-data';
import { PlayerDataService } from '../player/player-data/player-data.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor(private inventoryData: InventoryDataService, private playerData: PlayerDataService) { }

  ngOnInit(): void {
  }

  listItems(): Item[] {
    return this.inventoryData.listItems();
  }

  useItem(item: Item): void {
    item.action(this.playerData);
    this.inventoryData.removeItem(item, 1);
  }
}
