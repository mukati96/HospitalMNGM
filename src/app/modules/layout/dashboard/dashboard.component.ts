import { Component, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/services/app-state.service';
import { ROLES } from 'src/app/enum/roles';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public _countDetail: any = {};
  currentRole!: ROLES;
  ROLES = ROLES;

  constructor(private appState: AppStateService) {}

  ngOnInit(): void {
    this.currentRole = this.appState.getRole();
  }
}
