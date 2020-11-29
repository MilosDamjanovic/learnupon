import { NotFoundComponent } from './../not-found/not-found.component';
import { MatTabsModule } from '@angular/material/tabs';
import { UsersModule } from './../users/users.module';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, MatTabsModule, UsersModule],
  declarations: [HomeComponent, NotFoundComponent],
  providers: []
})

export class HomeModule { }
