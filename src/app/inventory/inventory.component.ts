import { Component, OnInit } from '@angular/core';
import { InventoryDataService } from './inventory-data/inventory-data.service';
import { Item } from './inventory-data/inventory-data';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor(private inventoryData: InventoryDataService) { }

  ngOnInit(): void {
  }

  listItems(): Item[] {
    return this.inventoryData.listItems();
  }
}
