import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { UserItemResponse } from 'src/app/model/user.model';

@Component({
  selector: 'lu-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {

  private _user!: UserItemResponse;

  @Input()
  get user(): UserItemResponse {
    return this._user;
  }
  set user(val) {
    if (this._user !== val) {
      this.changeDetectionRef.markForCheck();
    }
    this._user = val;
  }

  constructor(private sanitizer: DomSanitizer, private changeDetectionRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  public getSafeAvatar(imgPath: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustUrl(imgPath);
  }

}
