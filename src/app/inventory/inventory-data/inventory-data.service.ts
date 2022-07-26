import { Injectable } from '@angular/core';
import { LogWindowDataService } from 'src/app/log-window/log-window-data/log-window-data.service';
import { Inventory, INVENTORY, Item } from './inventory-data';

@Injectable({
  providedIn: 'root'
})
export class InventoryDataService {
  inventory: Inventory;

  constructor(private messageLog: LogWindowDataService) { 
    this.inventory = INVENTORY;
  }

  loadInventory(savedInventory: Inventory) {
    for (var i = 0; i < savedInventory.currencies.length; i++) {
      this.inventory.currencies[i].amount = savedInventory.currencies[i].amount;
    }
    for (var i = 0; i < savedInventory.items.length; i++) {
      this.inventory.items[i].amount = savedInventory.items[i].amount;
    }
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

  gainCurrency(currency: number, amount: number): void {
    this.inventory.currencies[currency].amount += amount;
    this.messageLog.addMessageToLog("You gained " + amount.toString() + " anima.");
  }

  gainItem(item: number, amount: number): void {
    this.inventory.items[item].amount += amount;
    this.messageLog.addMessageToLog(
      "You obtained a " +
      this.inventory.items[item].name +
      "."
    );
  }
  removeItem(item: Item, amount: number): void {
    item.amount -= amount;
  }
}
