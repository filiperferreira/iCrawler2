import { Injectable } from '@angular/core';
import { Inventory, INVENTORY, Item } from './inventory-data';

@Injectable({
  providedIn: 'root'
})
export class InventoryDataService {
  inventory: Inventory;

  constructor() { 
    this.inventory = INVENTORY;
  }

  listItems() {
    var items: Item[] = [];

    for (var item of this.inventory.items) {
      if (item.amount > 0) {
        items.push(item);
      }
    }

    return items;
  }

  gainItem(item: number, amount: number): void {
    this.inventory.items[item].amount += amount;
  }
  removeItem(item: Item, amount: number): void {
    item.amount -= amount;
  }
}
