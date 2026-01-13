import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-dots',
  standalone: true,
  template: `
    <p style="margin-top:12px; text-align:center; font-size:18px; min-height:1.2em;">
      Loading{{ dots }}
    </p>
  `,
})
export class LoadingDotsComponent implements OnInit, OnDestroy {
  dots = '';
  private intervalId: number | undefined;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.intervalId = window.setInterval(() => {
      this.dots = this.dots.length >= 3 ? '' : this.dots + '.';
      this.cdr.detectChanges();
    }, 350);
  }

  ngOnDestroy(): void {
    if (this.intervalId !== undefined) {
      window.clearInterval(this.intervalId);
    }
  }
}
