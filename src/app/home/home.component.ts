import { User } from './../model/user.model';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'lu-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  public users$: Observable<User[]> | undefined;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.users$ = this.getAllUsers();
  }

  public getAllUsers(): Observable<User[]> {
    return this.httpService.get()
      .pipe(map(res => res.user as User[]));
  }

}
