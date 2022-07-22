import { Component, OnInit } from '@angular/core';
import { LogWindowDataService } from './log-window-data/log-window-data.service';

@Component({
  selector: 'app-log-window',
  templateUrl: './log-window.component.html',
  styleUrls: ['./log-window.component.css']
})
export class LogWindowComponent implements OnInit {

  constructor(private logData: LogWindowDataService) { }

  ngOnInit(): void {
  }

  getMessageLog(): string[] {
    return this.logData.messageLog;
  }
}
