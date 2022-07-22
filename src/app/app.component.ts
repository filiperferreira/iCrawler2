import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DungeonDataService } from './dungeon/dungeon-data/dungeon-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "iCrawler2";

  currentBreakpoint: string = '';

  readonly breakpoint$ = this.breakpointObserver.observe([
    Breakpoints.XLarge,
    Breakpoints.Large,
    Breakpoints.Medium,
    Breakpoints.Small,
    Breakpoints.XSmall
  ])

  constructor(private breakpointObserver: BreakpointObserver, private dungeonData: DungeonDataService) { }

  ngOnInit(): void {
    this.breakpoint$.subscribe(() => this.breakpointChanged());
  }

  private breakpointChanged() {
    if (this.breakpointObserver.isMatched(Breakpoints.XLarge)) {
      this.currentBreakpoint = Breakpoints.XLarge;
    }
    if (this.breakpointObserver.isMatched(Breakpoints.Large)) {
      this.currentBreakpoint = Breakpoints.Large;
    }
    else if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
      this.currentBreakpoint = Breakpoints.Medium;
    }
    else if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
      this.currentBreakpoint = Breakpoints.Small;
    }
    else if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
      this.currentBreakpoint = Breakpoints.XSmall;
    }
  }

  getBreakpoint(): String {
    if (this.currentBreakpoint == Breakpoints.XLarge) {
      return "large-column";
    }
    else if (this.currentBreakpoint == Breakpoints.Large
      || this.currentBreakpoint == Breakpoints.Medium) {
      return "medium-column";
    }
    else if (this.currentBreakpoint == Breakpoints.Small
      || this.currentBreakpoint == Breakpoints.XSmall) {
      return "small-column";
    }
    return '';
  }
}
