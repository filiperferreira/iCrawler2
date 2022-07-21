import { Injectable } from '@angular/core';
import { Inventory, INVENTORY } from './inventory-data';

@Injectable({
  providedIn: 'root'
})
export class InventoryDataService {
  inventory: Inventory;

  constructor() { 
    this.inventory = INVENTORY;
  }

  gainItem(item: number, amount: number): void {
    this.inventory.items[item].amount += amount;
  }
}
