import { Component, OnInit } from '@angular/core';
import { FULL_ROUTES } from 'src/app/constants/routes';
import { SIDEBAR_ACCESS_PANEL } from 'src/app/constants/sidebar-roles';
import { StorageKeys } from 'src/app/constants/storage';
import { AppStateService } from 'src/app/services/app-state.service';
import { StorageService } from 'src/app/services/storage.service';
import { SidebarInterface } from '../../interfaces/sidebar.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  readonly FULL_ROUTES = FULL_ROUTES;
  SIDEBAR: SidebarInterface = SIDEBAR_ACCESS_PANEL.PATIENT;
  userInfo: any = this.storage.getFromLocalStorage(StorageKeys.USER_INFO);

  constructor(private appStateService: AppStateService, private storage: StorageService) {}

  ngOnInit(): void {
    if(this.appStateService.isloggedInUserSuperAdmin()) {
      this.SIDEBAR = SIDEBAR_ACCESS_PANEL.SUPERADMIN;
    } else if(this.appStateService.isloggedInUserPracticeAdmin()) {
      this.SIDEBAR = SIDEBAR_ACCESS_PANEL.PRACTICEADMIN;
    } else if(this.appStateService.isloggedInUserCareManager()) {
      this.SIDEBAR = SIDEBAR_ACCESS_PANEL.CAREMANAGER;
    } else {
      this.SIDEBAR = SIDEBAR_ACCESS_PANEL.PATIENT;
    }
  }

}
