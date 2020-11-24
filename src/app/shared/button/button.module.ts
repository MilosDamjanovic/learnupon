import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule
  ],
  exports: [ButtonComponent],
  declarations: [ButtonComponent],
})
export class ButtonModule { }
