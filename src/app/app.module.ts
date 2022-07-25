import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { DungeonComponent } from './dungeon/dungeon.component';
import { InventoryComponent } from './inventory/inventory.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { CombatComponent } from './combat/combat.component';
import { LogWindowComponent } from './log-window/log-window.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    DungeonComponent,
    InventoryComponent,
    CombatComponent,
    LogWindowComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
