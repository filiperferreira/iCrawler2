import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DungeonDataService } from './dungeon/dungeon-data/dungeon-data.service';
import { PlayerDataService } from './player/player-data/player-data.service';
import { InventoryDataService } from './inventory/inventory-data/inventory-data.service';
import { CombatDataService } from './combat/combat-data/combat-data.service';
import { UpgradeDataService } from './upgrade/upgrade-data/upgrade-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "iCrawler2";

  loaded: boolean = false;
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
    private inventoryData: InventoryDataService,
    private combatData: CombatDataService,
    private upgradeData: UpgradeDataService
  ) { }

  ngOnInit(): void {
    this.breakpoint$.subscribe(() => this.breakpointChanged());
    if (localStorage.length != 0) {
      this.loadGame();
      this.loaded = true;
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
      this.playerData.loadPlayer(JSON.parse(loader));
    }

    loader = localStorage.getItem('dungeon');
    if (loader) {
      this.dungeonData.loadDungeon(JSON.parse(loader));
    }

    loader = localStorage.getItem('inventory');
    if (loader) {
      this.inventoryData.loadInventory(JSON.parse(loader));
    }

    loader = localStorage.getItem('inCombat');
    if (loader && JSON.parse(loader)) {
      this.dungeonData.setInCombat(true);
      var enemy = localStorage.getItem('combatEnemy');
      if (enemy) {
        this.combatData.loadCombat(JSON.parse(enemy), this.dungeonData);
      }
    }

    loader = localStorage.getItem('upgrades');
    if (loader) {
      this.upgradeData.loadUpgrades(JSON.parse(loader));
    }
  }

  saveGame(): void {
    localStorage.setItem('player', JSON.stringify(this.playerData.player));
    localStorage.setItem('dungeon', JSON.stringify(this.dungeonData.dungeon));
    localStorage.setItem('inventory', JSON.stringify(this.inventoryData.inventory));
    localStorage.setItem('inCombat', JSON.stringify(this.dungeonData.inCombat));
    localStorage.setItem('combatEnemy', JSON.stringify(this.combatData.enemy));
    localStorage.setItem('upgrades', JSON.stringify(this.upgradeData.upgrades));
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

  getBreakpoint(type: string): String {
    if (type == "outer") {
      if (this.currentBreakpoint == Breakpoints.XLarge) {
        return "outer-small";
      }
      else if (this.currentBreakpoint == Breakpoints.Large
        || this.currentBreakpoint == Breakpoints.Medium) {
        return "outer-small";
      }
      else if (this.currentBreakpoint == Breakpoints.Small
        || this.currentBreakpoint == Breakpoints.XSmall) {
        return "outer-large";
      }
    }
    else {
      if (this.currentBreakpoint == Breakpoints.XLarge) {
        return "inner-small";
      }
      else if (this.currentBreakpoint == Breakpoints.Large
        || this.currentBreakpoint == Breakpoints.Medium) {
        return "inner-large";
      }
      else if (this.currentBreakpoint == Breakpoints.Small
        || this.currentBreakpoint == Breakpoints.XSmall) {
        return "inner-large";
      }
    }
    return '';
  }

  seconds: number = 5;
  action = setInterval(() => {
    if (this.loaded) {
      this.saveGame();
    }
  }, this.seconds * 1000);
}
