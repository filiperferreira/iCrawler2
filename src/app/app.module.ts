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
import { UpgradeComponent } from './upgrade/upgrade.component';
import { FormsModule } from '@angular/forms';
import { PanelComponent } from './panel/panel.component';
import { NameChooserComponent } from './name-chooser/name-chooser.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    DungeonComponent,
    InventoryComponent,
    CombatComponent,
    LogWindowComponent,
    UpgradeComponent,
    PanelComponent,
    NameChooserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
