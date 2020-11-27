import { ButtonService } from './../../shared/button/button.service';
import { UserReq } from './../../model/user.model';
import { HttpService } from './../../../services/http.service';
import { CreateUserDialogComponent, createUserDialogConfig } from './../../shared/dialog/create-user-dialog/create-user-dialog.component';
import { DialogService } from './../../shared/dialog/dialog.service';
import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  backgroundGrey, backgroundPrimary, backgroundTransparent,
  defaultBtnConf, fontBold, imgBtnConf, imgGreyColor, imgPrimaryColor,
  imgWhiteColor, noBorders,
  iconAlignment,
  borderBtn
} from 'src/app/shared/button/button-config';

@Component({
  selector: 'lu-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnDestroy {
  private unsubscribe$: Subject<any> = new Subject();

  constructor(
    private dialogService: DialogService,
    private httpService: HttpService,
    private btnService: ButtonService
  ) { }

  public noBorderBackgroundBtnConfig = {
    styles: this.btnService.createBtn(defaultBtnConf)(noBorders)(backgroundTransparent)(imgPrimaryColor),
    iconStyles: { ...imgBtnConf, ...imgPrimaryColor, },
    action: 'Something',
    image: 'Click Here' // better way...
  };

  public transparentBackgroundBtnConfig = {
    styles: this.btnService.createBtn(defaultBtnConf)(backgroundTransparent)(borderBtn)(null),
    action: 'Something',
    text: 'Click Here' // better way...
  };

  public primaryImageBackgroundBtnConfig = {
    styles: this.btnService.createBtn(defaultBtnConf)(backgroundPrimary)(imgWhiteColor)(noBorders),
    iconStyles: { ...imgBtnConf, ...iconAlignment, ...imgWhiteColor, ...fontBold },
    image: 'Create' // better way...
  };

  public greyImageBackgroundBtnConfig = {
    styles: this.btnService.createBtn(defaultBtnConf)(backgroundGrey)(backgroundGrey)(noBorders),
    iconStyles: {
      ...imgGreyColor, ...imgBtnConf, ...iconAlignment
    },
    image: 'Action' // better way...
  };

  public onClickEventReceived(event: string): void {
    if (event === 'openCreateUserDialog') {
      this.openCreateUserDialog();
    }
  }

  private openCreateUserDialog(): void {
    this.dialogService.open(CreateUserDialogComponent, { ...createUserDialogConfig })
      .subscribe({
        next: this.createUser.bind(this)
      });
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
