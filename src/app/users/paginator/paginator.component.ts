import { Component } from '@angular/core';

@Component({
  selector: 'lu-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  public step = 1;
  constructor() { }

  onNavigateClick(event: number): void {
    const sign = Math.sign(event);
    if (sign < 0 && this.step === 1) { return; }
    this.step += event;
  }

}
