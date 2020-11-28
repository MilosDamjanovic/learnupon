import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HttpService } from './../../services/http.service';
import { User, UserReq, UserItemResponse } from './../model/user.model';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'lu-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<any> = new Subject();
  public users: UserItemResponse[] = [];

  constructor(
    private httpService: HttpService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  private getAllUsers(): void {
    this.httpService.get()
      .pipe(
        takeUntil(this.unsubscribe$),
        map(res => res.user as User[]),
        map(users => users.map(
          (
            { first_name,
              last_name,
              sign_in_count,
              id,
              email,
              number_of_enrollments,
              number_of_enrollments_accessed
            }
          ) => (
              {
                first_name,
                last_name,
                id,
                email,
                number_of_enrollments,
                sign_in_count,
                number_of_enrollments_accessed,
                isSelected: false
              }
            ))
        )
      ).subscribe(users => {
        this.users = users;
        this.changeDetectorRef.detectChanges();
      });
  }

  selectAllUsers(selected: boolean): void {
    if (this.users.every(user => user.isSelected === true)) {
      this.users.forEach(user => { user.isSelected = selected; });
    }
    else {
      this.users.forEach(user => { user.isSelected = selected; });
    }
  }

  sortAllUsers(): void {
    this.users.sort((a, b) => {
      return a.first_name.localeCompare(b.first_name, 'en', { sensitivity: 'base' });
    });
  }

  createUser(userReq: UserReq): void {
    this.httpService.post(userReq)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: this.handleSuccessReq.bind(this),
        error: this.handleError.bind(this)
      });

  }

  private handleSuccessReq(response: { id: number }): void {
    console.log('Successfully created a new user with ID: ', response.id);
  }

  private handleError(err: any): void {
    console.error('Failed to create a new user: ', err);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
