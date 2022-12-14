import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { StorageKeys } from "../constants/storage";
import { StorageService } from "../services/storage.service";
import { AuthService } from "../services/auth.service";
import { ToastService } from "../services/toast.service";

@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private _auth: AuthService,
                private _toast: ToastService,
                private storageService: StorageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.storageService.getFromLocalStorage(StorageKeys.TOKEN);
        if (this._auth.isAuthenticated()) {
            req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
              let errorMessage: string = 'Something went wrong plz try again later.';
              if (error.error instanceof ErrorEvent) {
                // client-side error
                errorMessage = error.error.message;
              }
              if (error?.error?.message) {
                errorMessage = error.error.message;
              }
              if (error.status === 401) { // unauthorised
                this._auth.logout();
                this._toast.openErrorToast('Session Expired');
              }
              error.error.message = errorMessage;
              return throwError(() => error.error);
            })
        );
    }
}
