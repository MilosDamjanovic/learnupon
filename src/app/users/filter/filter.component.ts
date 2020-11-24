import { ButtonService } from './../../shared/button/button.service';
import { UserReq } from './../../model/user.model';
import { HttpService } from './../../../services/http.service';
import { CreateUserDialogComponent, createUserDialogConfig } from './../../shared/dialog/create-user-dialog/create-user-dialog.component';
import { DialogService } from './../../shared/dialog/dialog.service';
import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { backgroundTransparent, defaultBtnConf, imgBtnConf, imgColor } from 'src/app/shared/button/button-config';

@Component({
  selector: 'lu-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnDestroy {
  /** button scroll problem !! */
  private unsubscribe$: Subject<any> = new Subject();

  constructor(
    private dialogService: DialogService,
    private httpService: HttpService,
    private btnService: ButtonService
  ) { }

  public textBtnConfig = {
    styles: this.btnService.createBtn(defaultBtnConf)(backgroundTransparent)(imgBtnConf)(imgColor),
    text: 'Click Here' // better way...
  };

  public menuBtnConfig = {
    styles: {
      width: '12rem',
      overflow: 'auto',
      maxWidth: '16rem',
      height: '2.8rem',
      backgroundColor: 'transparent',
      fontSize: '1.6rem',
      fontWeight: '400',
      borderRadius: 'rgba(var(--border-radius), 1)',
      boxShadow: 'none',
      textDecoration: 'none',
      position: 'relative'
    },
    iconStyles: {
      position: 'absolute',
      color: ''
    },
    image: 'Click Here+'
  };

  public openCreateUserDialog(event: any): void {
    event.stopPropagation();
    event.preventDefault();
    this.dialogService.open(CreateUserDialogComponent, { ...createUserDialogConfig })
      .subscribe({
        next: this.createUser.bind(this)
      });
  }

  onClickEventReceived(event: any): void {
    // this.message = event;
    console.log(event);
  }

  private createUser(user: any): void {
    if (!user) {
      return;
    }
    const userReq = user as UserReq;
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
