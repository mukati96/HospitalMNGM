import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRoutes, FULL_ROUTES } from 'src/app/constants/routes';
import { ROLES } from 'src/app/enum/roles';
import { AppStateService } from 'src/app/services/app-state.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  readonly AuthRoutes = AuthRoutes;
  readonly FULL_ROUTES = FULL_ROUTES;
  cuurentRole!: string;
  ROLES = ROLES;

  constructor(private authService:AuthService, 
              private router:Router, 
              private appState: AppStateService) { }

  ngOnInit(): void {
    this.cuurentRole = this.appState.getRole();
  }

  logOut(){
    this.authService.logout();
    this.router.navigate([AuthRoutes.LOGIN]);
  }

}
