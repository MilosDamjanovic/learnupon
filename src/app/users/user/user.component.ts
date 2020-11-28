import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { User, UserItemResponse } from 'src/app/model/user.model';

@Component({
  selector: 'lu-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input()
  user!: UserItemResponse;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  public getSafeAvatar(imgPath: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustUrl(imgPath);
  }

}
