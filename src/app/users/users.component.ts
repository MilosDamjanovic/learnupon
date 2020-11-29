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
export class UsersComponent implements OnDestroy, OnInit {
  private unsubscribe$: Subject<any> = new Subject();
  private users: UserItemResponse[] = [];
  public filteredUsers: UserItemResponse[] = [];

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
    )
      .subscribe(users => {
        this.users = [...users];
        this.filteredUsers = [...users];
        this.changeDetectorRef.detectChanges();
      });
  }

  trackByFn(i: number, item: any): any {
    return item;
  }

  selectAllUsers(selected: boolean): void {
    this.filteredUsers = this.users.map(u => {
      u.isSelected = selected;
      return { ...u };
    });
    this.changeDetectorRef.markForCheck();
  }

  filterUsers(queryString: string): void {
    this.filteredUsers = this.users.filter(({ first_name, last_name, email }) => {
      const userData = `${first_name} ${last_name} ${email} `.toLocaleLowerCase();
      return userData.includes(queryString.toLocaleLowerCase());
    });
    this.changeDetectorRef.markForCheck();
  }

  sortAllUsers(): void {
    this.filteredUsers.sort((a, b) => {
      return a.first_name.localeCompare(b.first_name, 'en', { sensitivity: 'base' });
    });
    this.changeDetectorRef.detectChanges();
  }

  createUser(userReq: UserReq): void {
    this.httpService.post(userReq)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: this.handleSuccessReq.bind(this),
        error: this.handleError.bind(this)
      });
    this.changeDetectorRef.detectChanges();
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
