import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { DialogService } from './dialog.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatDialogModule],
  providers: [DialogService]
  ,
})
export class DialogModule { }
