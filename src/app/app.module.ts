import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { StatPipePipe } from './stat-pipe.pipe';
import { DungeonComponent } from './dungeon/dungeon.component';
import { InventoryComponent } from './inventory/inventory.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ContainerPlateComponent } from './container-plate/container-plate.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    StatPipePipe,
    DungeonComponent,
    InventoryComponent,
    ContainerPlateComponent
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
