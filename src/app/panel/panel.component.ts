import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  @Input() componentName: string = "";
  @Output() loadEvent = new EventEmitter<string>();

  display: boolean = true;
  subtitle: string = "";
  title: string = "";

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {}

  updateHeader(header: string[]): void {
    this.subtitle = header[0];
    this.title = header[1];
    this.cd.detectChanges();
  }

  toggleDisplay(display: boolean): void {
    console.log(display);
    this.display = display;
  }

  nameChosen(newName: string): void {
    this.loadEvent.emit(newName);
  }
}
