import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { StorageService } from 'src/app/services/storage.service';
import { StorageKeys } from '../constants/storage';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  userInfo: any;

  constructor(
    public httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  setHeaders() {
    this.userInfo = this.storageService.getFromLocalStorage('userInfo');
    let headers = new HttpHeaders();
    if (this.userInfo) {
      headers = headers.append('Authorization', `${StorageKeys.TOKEN} `);
    }
    return headers;
  }

  get(endpoint: string, query?: any) {
    return this.httpClient.get<any>(`${environment.BASE_URL}/${endpoint}`, {
      headers: this.setHeaders(),
      params: query,
    });
  }

  post(endpoint: string, data: any) {
    return this.httpClient.post<any>(
      `${environment.BASE_URL}/${endpoint}`,
      data,
      {
        headers: this.setHeaders(),
      }
    );
  }

  patch(endpoint: string, data: any) {
    return this.httpClient.patch<any>(
      `${environment.BASE_URL}/${endpoint}`,
      data,
      {
        headers: this.setHeaders(),
      }
    );
  }

  put(endpoint: string, data: any) {
    return this.httpClient.put<any>(
      `${environment.BASE_URL}/${endpoint}`,
      data,
      {
        headers: this.setHeaders(),
      }
    );
  }

  delete(endpoint: string, query?: any) {
    return this.httpClient.delete(`${environment.BASE_URL}/${endpoint}`, {
      headers: this.setHeaders(),
      params: query,
    });
  }

  getFromHippaServer(endpoint: string, query?: any) {
    return this.httpClient.get<any>(`${environment.HIPPA_URL}/${endpoint}`, {
      headers: this.setHeaders(),
      params: query,
    });
  }
}
