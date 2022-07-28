import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  @Input() componentName: string = "";

  display: boolean = true;
  subtitle: string = "";
  title: string = "";

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {}

  updateHeader(header: string[]) {
    this.subtitle = header[0];
    this.title = header[1];
    this.cd.detectChanges();
  }

  toggleDisplay(display: boolean) {
    console.log(display);
    this.display = display;
  }
}
