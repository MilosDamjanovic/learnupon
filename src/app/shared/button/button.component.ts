import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lu-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() buttonConfig: any;
  @Input() title = '';
  @Input() icon = '';
  @Output() buttonClicked = new EventEmitter<any>();

  constructor() { }

  public onTextBtnClick(event: any): void {
    this.buttonClicked.emit(event);
  }

  public onImgBtnClick(event: any): void {
    this.buttonClicked.emit(event);
  }

}
