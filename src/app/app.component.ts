import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DungeonDataService } from './dungeon/dungeon-data/dungeon-data.service';
import { PlayerDataService } from './player/player-data/player-data.service';
import { InventoryDataService } from './inventory/inventory-data/inventory-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "iCrawler2";

  currentBreakpoint: string = '';

  readonly breakpoint$ = this.breakpointObserver.observe([
    Breakpoints.XLarge,
    Breakpoints.Large,
    Breakpoints.Medium,
    Breakpoints.Small,
    Breakpoints.XSmall
  ])

  constructor(
    private breakpointObserver: BreakpointObserver,
    private playerData: PlayerDataService,
    private dungeonData: DungeonDataService,
    private inventoryData: InventoryDataService
  ) { }

  ngOnInit(): void {
    this.breakpoint$.subscribe(() => this.breakpointChanged());
    if (localStorage.length != 0) {
      this.loadGame();
    }
    else {
      console.log("hello");
    }
  }

  clearSave(): void {
    localStorage.clear();
    location.reload();
  }

  loadGame(): void {
    var loader = localStorage.getItem('player');
    if (loader) {
      this.playerData.player = JSON.parse(loader);
    }

    loader = localStorage.getItem('dungeon');
    if (loader) {
      this.dungeonData.loadDungeon(JSON.parse(loader));
    }

    loader = localStorage.getItem('inventory');
    if (loader) {
      this.inventoryData.inventory = JSON.parse(loader);
    }
  }

  saveGame(): void {
    localStorage.setItem('player', JSON.stringify(this.playerData.player));
    localStorage.setItem('dungeon', JSON.stringify(this.dungeonData.dungeon));
    localStorage.setItem('inventory', JSON.stringify(this.inventoryData.inventory));
  }

  private breakpointChanged(): void {
    if (this.breakpointObserver.isMatched(Breakpoints.XLarge)) {
      this.currentBreakpoint = Breakpoints.XLarge;
    }
    if (this.breakpointObserver.isMatched(Breakpoints.Large)) {
      this.currentBreakpoint = Breakpoints.Large;
    }
    else if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
      this.currentBreakpoint = Breakpoints.Medium;
    }
    else if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
      this.currentBreakpoint = Breakpoints.Small;
    }
    else if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
      this.currentBreakpoint = Breakpoints.XSmall;
    }
  }

  getBreakpoint(): String {
    if (this.currentBreakpoint == Breakpoints.XLarge) {
      return "large-column";
    }
    else if (this.currentBreakpoint == Breakpoints.Large
      || this.currentBreakpoint == Breakpoints.Medium) {
      return "medium-column";
    }
    else if (this.currentBreakpoint == Breakpoints.Small
      || this.currentBreakpoint == Breakpoints.XSmall) {
      return "small-column";
    }
    return '';
  }

  seconds: number = 5;
  action = setInterval(() => {
    this.saveGame();
  }, this.seconds * 1000);
}
