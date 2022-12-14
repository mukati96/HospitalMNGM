import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {StorageKeys} from "../constants/storage";
import { AppStateService } from './app-state.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public disableViewClient:boolean=false;
  summeryDataObservable = new BehaviorSubject({});
  mounthCareDataObservable = new BehaviorSubject({});
  callLogsDataObservable = new BehaviorSubject({});
  vitalsDataObservable = new BehaviorSubject({});
  awvDataObservable = new BehaviorSubject({});
  assessmentDataObservable = new BehaviorSubject({});
  taskDataObservable = new BehaviorSubject({});
  
  constructor(private appStateService: AppStateService) { }

  getToken() {
    return this.getFromLocalStorage(StorageKeys.TOKEN);
  }

  saveToLocalStorage = (key: string, value: any) => {
    localStorage[key] = JSON.stringify(value);
  };

  getFromLocalStorage(key: string): any {
    if (localStorage[key]) {
      return JSON.parse(localStorage[key] || 'null');
    } else {
      return false;
    }
  }

  removeFromLocalStorage(key: string): any {
    localStorage.removeItem(key);
  }

  resetStorage() {
    localStorage.clear();
    this.appStateService.resetUserProfile();
  }

  setColSelection(key:any, data?:any) {
		localStorage.setItem(key, window.btoa(JSON.stringify(data)));
	}

	getColSelection(key:any) {
		let colSelectionData: any = localStorage.getItem(key) != "undefined" ? localStorage.getItem(key) : null;
		if(colSelectionData) {
			colSelectionData = JSON.parse(window.atob(colSelectionData));
		}
		return colSelectionData;
	}
  
}
