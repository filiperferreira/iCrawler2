import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlayerDataService } from '../player/player-data/player-data.service';

@Component({
  selector: 'app-name-chooser',
  templateUrl: './name-chooser.component.html',
  styleUrls: ['./name-chooser.component.css']
})
export class NameChooserComponent implements OnInit {
  @Output() initEvent = new EventEmitter<string[]>();
  @Output() loadEvent = new EventEmitter<string>();

  subtitle: string = "";
  title: string = "Choose Your Name";
  name: string = "Crawler";
  
  constructor(private playerData: PlayerDataService) { }

  ngOnInit(): void {
    this.initEvent.emit([this.subtitle, this.title]);
  }

  setName(): void {
    this.loadEvent.emit(this.name);
  }
}
