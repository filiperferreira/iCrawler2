import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { StatPipePipe } from './stat-pipe.pipe';
import { DungeonComponent } from './dungeon/dungeon.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    StatPipePipe,
    DungeonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
