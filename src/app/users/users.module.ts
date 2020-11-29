import { CreateUserDialogModule } from 'src/app/shared/dialog/create-user-dialog/create-user.dialog.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from './paginator/paginator.component';
import { ButtonModule } from './../shared/button/button.module';
import { FilterComponent } from './filter/filter.component';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { UserComponent } from './user/user.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [UsersComponent, UserComponent, PaginatorComponent, FilterComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    ButtonModule,
    UsersRoutingModule,
    MatCheckboxModule,
    CreateUserDialogModule
  ],
  providers: [],
  exports: [UsersComponent]
})
export class UsersModule { }
