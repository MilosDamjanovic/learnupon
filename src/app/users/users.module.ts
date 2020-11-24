import { PaginatorComponent } from './paginator/paginator.component';
import { ButtonModule } from './../shared/button/button.module';
import { MaterialModule } from './../material.module';
import { CreateUserDialogModule } from './../shared/dialog/create-user-dialog/create-user.dialog.module';
import { FilterComponent } from './filter/filter.component';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [UsersComponent, UserComponent, PaginatorComponent, FilterComponent],
  imports: [CommonModule, MaterialModule, ButtonModule, UsersRoutingModule, CreateUserDialogModule],
  providers: [],
  exports: [UsersComponent]
})
export class UsersModule { }
