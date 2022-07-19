import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Player } from './player-data/player-data';
import { PlayerDataService } from './player-data/player-data.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Output() initEvent = new EventEmitter<string>();

  constructor(private playerData: PlayerDataService) { }

  ngOnInit(): void {
    this.initEvent.emit(this.getPlayer().name);
  }

  getPlayer(): Player {
    return this.playerData.getPlayerData();
  }
}
