import { ButtonService } from './../../shared/button/button.service';
import { UserReq } from './../../model/user.model';
import { CreateUserDialogComponent, createUserDialogConfig } from './../../shared/dialog/create-user-dialog/create-user-dialog.component';
import { DialogService } from './../../shared/dialog/dialog.service';
import { Component, Input, OnDestroy, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  backgroundGrey, backgroundPrimary, backgroundTransparent,
  defaultBtnConf, fontBold, imgBtnConf, imgGreyColor, imgPrimaryColor,
  imgWhiteColor, noBorders,
  iconAlignment,
  borderBtn
} from 'src/app/shared/button/button-config';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'lu-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnDestroy {
  private unsubscribe$: Subject<any> = new Subject();
  public masterSelected = false;
  @Input()
  numberOfUsers!: number;
  @Output() selectAllUsers = new EventEmitter<boolean>();
  @Output() sortAllUsers = new EventEmitter<boolean>();
  @Output() createNewUser = new EventEmitter<UserReq>();
  @Output() filteredUser = new EventEmitter<string>();

  constructor(
    private dialogService: DialogService,
    private btnService: ButtonService
  ) { }

  public noBorderBackgroundBtnConfig = {
    styles: this.btnService.createBtn(defaultBtnConf)(noBorders)(backgroundTransparent)(imgPrimaryColor),
    iconStyles: { ...imgBtnConf, ...imgPrimaryColor, },
    hasIcon: true
  };

  public transparentBackgroundBtnConfig = {
    styles: this.btnService.createBtn(defaultBtnConf)(backgroundTransparent)(borderBtn)(null),
    hasIcon: false
  };

  public primaryImageBackgroundBtnConfig = {
    styles: this.btnService.createBtn(defaultBtnConf)(backgroundPrimary)(imgWhiteColor)(noBorders),
    iconStyles: { ...imgBtnConf, ...iconAlignment, ...imgWhiteColor, ...fontBold },
    hasIcon: true
  };

  public greyImageBackgroundBtnConfig = {
    styles: this.btnService.createBtn(defaultBtnConf)(backgroundGrey)(backgroundGrey)(noBorders),
    iconStyles: {
      ...imgGreyColor, ...imgBtnConf, ...iconAlignment
    },
    hasIcon: true
  };

  public onSelectAll(event: MatCheckboxChange): void {
    this.selectAllUsers.emit(event.checked);
  }

  public onClickEventReceived(event: string): void {
    if (event === 'openCreateUserDialog') {
      this.openCreateUserDialog();
    }
    if (event === 'sort') {
      this.sortAllUsers.emit(true);
    }
  }

  public onInputChange(event: any): void {
    this.filteredUser.emit((event.target as HTMLInputElement).value);
  }

  private openCreateUserDialog(): void {
    this.dialogService.open(CreateUserDialogComponent, { ...createUserDialogConfig })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: this.createUser.bind(this)
      });
  }

  private createUser(user: any): void {
    if (!user) {
      return;
    }
    const userReq = user as UserReq;
    this.createNewUser.emit(userReq);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
