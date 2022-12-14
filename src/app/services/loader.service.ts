import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  static loaderEnabled = false;

  constructor() { }

  public showLoader() {
    LoaderService.loaderEnabled = true;
  }

  public hideLoader() {
    LoaderService.loaderEnabled = false;
  }

  getLoaderState() {
    return LoaderService.loaderEnabled;
  }
}
