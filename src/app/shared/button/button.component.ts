import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lu-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() buttonConfig: any | undefined;
  @Input() title = '';
  @Input() icon = '';
  @Input() action = '';
  @Output() buttonClicked = new EventEmitter<string>();

  constructor() { }

  public onTextBtnClick(event: any): void {
    event.stopPropagation();
    event.preventDefault();
    this.buttonClicked.emit(this.action);
  }

  public onImgBtnClick(event: any): void {
    event.stopPropagation();
    event.preventDefault();
    this.buttonClicked.emit(this.action);
  }

}
