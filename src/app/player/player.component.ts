import { Component, OnInit } from '@angular/core';
import { Player } from './player-data/player-data';
import { PlayerDataService } from './player-data/player-data.service';
import { BreakpointService } from '../breakpoint.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  constructor(private playerData: PlayerDataService, private responsiveSize: BreakpointService) { }

  ngOnInit(): void {}

  getPlayer(): Player {
    return this.playerData.getPlayerData();
  }

  getResponsiveSize(): String {
    return this.responsiveSize.getBreakpoint();
  }
}
