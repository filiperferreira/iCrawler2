import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {
  @Output() initEvent = new EventEmitter<string[]>();

  subtitle: string = "";
  title: string = "Upgrades";

  constructor() { }

  ngOnInit(): void {
    this.initEvent.emit([this.subtitle, this.title]);
  }
}
