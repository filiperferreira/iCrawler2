import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LogWindowDataService } from './log-window-data/log-window-data.service';

@Component({
  selector: 'app-log-window',
  templateUrl: './log-window.component.html',
  styleUrls: ['./log-window.component.css']
})
export class LogWindowComponent implements OnInit {
  @Output() initEvent = new EventEmitter<string[]>();

  subtitle: string = "";
  title: string = "Log Window";

  ngOnInit(): void {
    this.initEvent.emit([this.subtitle, this.title]);
  }

  constructor(private logData: LogWindowDataService) { }

  getMessageLog(): string[] {
    return this.logData.messageLog;
  }
}
