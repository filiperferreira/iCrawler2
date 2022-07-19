import { Injectable, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  currentBreakpoint: string = '';

  readonly breakpoint$ = this.breakpointObserver.observe([
    Breakpoints.XLarge,
    Breakpoints.Large,
    Breakpoints.Medium,
    Breakpoints.Small,
    Breakpoints.XSmall
  ])

  constructor(private breakpointObserver: BreakpointObserver) { }

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
    console.log(this.currentBreakpoint);
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
