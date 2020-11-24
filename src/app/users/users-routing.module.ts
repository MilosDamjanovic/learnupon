import { UsersComponent } from './users.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const routes = [
  { path: '', component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UsersRoutingModule { }
