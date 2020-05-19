import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private dialog: MatDialog) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.router.navigateByUrl('/NotFound');
        }
        if (error.status === 400) {
          console.log(error);
          const dialogConfig = {
            backdropClass: 'modalOverlay',
            disableClose: true,
            hasBackdrop: true,
            autoFocus: false,
            width: '40%',
          } as MatDialogConfig;
          dialogConfig.data = { title: error.error};

          const dialogRef = this.dialog.open(ErrorDialogComponent, dialogConfig);
          return dialogRef.afterClosed();
        } else {
          return throwError(error);
        }
      })
    );
  }
}
