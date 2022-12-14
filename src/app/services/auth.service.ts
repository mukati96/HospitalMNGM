import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { StorageKeys } from 'src/app/constants/storage';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AppStateService } from './app-state.service';
import { FULL_ROUTES } from '../constants/routes';
import { catchError, map, Observable, of } from 'rxjs';
import { URLS } from '../constants/url';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storageService: StorageService,
              private appStateService: AppStateService,
              private httpService: HttpService,
              private router: Router) { }

  isAuthenticated(): boolean {
    return !!this.storageService.getFromLocalStorage(StorageKeys.TOKEN);
  }

  saveToken(token: string): void {
    this.storageService.saveToLocalStorage(StorageKeys.TOKEN, token);
  }

  saveLoginSession(user: any): void {
    this.appStateService.saveUserProfile(user);
  }

  logout(): void {
    this.storageService.resetStorage();
    this.router.navigate([FULL_ROUTES.LOGIN]);
  }

  validateToken(route: ActivatedRouteSnapshot): Observable<any> {
    return this.httpService.get(`${URLS.VERIFY_RESET_PASSWORD_TOKEN}/${route.params['token']}/${route.params['uid']}`).pipe(map(m => m.data),
    catchError(err => {
      return this.router.navigate([FULL_ROUTES.LOGIN]);
    }));
  }

}
