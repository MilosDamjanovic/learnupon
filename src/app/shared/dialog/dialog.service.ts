import { Injectable, TemplateRef } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

const defaultDialogConfig: MatDialogConfig = {
  autoFocus: false,
  width: '420px',
  maxWidth: '80vw',
};

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) { }

  public open<D, R>(component: ComponentType<any> | TemplateRef<any>, config: MatDialogConfig<D>): Observable<R> {
    return new Observable((observer: Subscriber<R>) => {
      this.dialog
        .open(component, { ...defaultDialogConfig, ...config })
        .afterClosed()
        .subscribe((result: R) => {
          observer.next(result as R);
          observer.complete();
        });
    });
  }
}
