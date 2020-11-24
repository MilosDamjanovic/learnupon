import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public post(body: any): Observable<any> {
    return this.http.post(environment.apiPath, body, this.headers).pipe(catchError(this.handleError.bind(this)));
  }

  public get(): Observable<any> {
    return this.http.get(environment.apiPath, this.headers).pipe(catchError(this.handleError.bind(this)));
  }

  private handleError(error: HttpErrorResponse | any): Observable<any> {
    const err = error.error;
    return throwError(error);
  }

  get headers(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(`${environment.username}:${environment.password}`)
      })
    };
  }

}
