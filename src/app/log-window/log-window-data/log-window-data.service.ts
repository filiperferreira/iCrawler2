import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogWindowDataService {
  messageLog: string[] = [];

  constructor() { }

  addMessageToLog(message: string) {
    if (this.messageLog.length == 25) {
      this.messageLog.shift();
    }
    this.messageLog.push(message);
  }
}
