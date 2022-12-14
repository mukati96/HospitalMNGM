import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageKeys } from '../constants/storage';
import { ROLES } from '../enum/roles';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  userProfileUpdate = new BehaviorSubject<any>(null);
  userSession$: any = {
    // PROFILE: {role: 'SUPERADMIN'}
    PROFILE: null
  };

  constructor() { }

  onProfileUpdate(): Observable<any> {
    return this.userProfileUpdate.asObservable();
  }

  saveUserProfile(profile: any) {
    this.userProfileUpdate.next(profile);
    this.userSession$.PROFILE = profile;
  }

  isloggedInUserSuperAdmin() {
    return this.getRole() === ROLES.SUPERADMIN;
  }

  isloggedInUserPracticeAdmin() {
    return this.getRole() === ROLES.PRACTICEADMIN;
  }

  isloggedInUserCareManager() {
    return this.getRole() === ROLES.CAREMANAGER;
  }

  isloggedInUserPatient() {
    return this.getRole() === ROLES.PATIENT;
  }

  getUserProfile() {
    return this.userSession$.PROFILE;
  }

  resetUserProfile() {
    this.userSession$ = {
      PROFILE: null
    }
    this.userProfileUpdate.next(null);
  }

  isLoggedInUser(id: any) {
    return id === this.userSession$.PROFILE.emp_id;
  }

  getRole() {
    return this.getFromLocalStorage(StorageKeys.ROLE);
  }

  getFromLocalStorage(key: string): any {
    if (localStorage[key]) {
      return JSON.parse(localStorage[key] || 'null');
    } else {
      return false;
    }
  }
}
