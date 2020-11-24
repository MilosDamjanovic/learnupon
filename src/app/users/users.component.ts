import { User } from './../model/user.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lu-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @Input()
  users: User[] = []; // what if empty

  constructor() { }

  ngOnInit(): void {
  }

}
