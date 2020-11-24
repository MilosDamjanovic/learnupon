import { MaterialModule } from './../../../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserDialogComponent } from './../create-user-dialog/create-user-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  declarations: [CreateUserDialogComponent],
  providers: [],
  exports: [CreateUserDialogComponent],
})

export class CreateUserDialogModule { }
