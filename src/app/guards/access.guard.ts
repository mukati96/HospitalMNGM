import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { FULL_ROUTES } from '../constants/routes';
import { SIDEBAR_ACCESS_PANEL } from '../constants/sidebar-roles';
import { FEATURE_SLUGS } from '../enum/feature-slug';
import { ROLES } from '../enum/roles';
import { AppStateService } from '../services/app-state.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {

  constructor(private appStateService: AppStateService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      const slug: FEATURE_SLUGS = route.data['feature'];
      const role: ROLES = this.appStateService.getRole();
      if(SIDEBAR_ACCESS_PANEL[role][slug]) {
        return true
      } else {
        this.router.navigate([FULL_ROUTES.DASHBOARD]);
        return false;
      }
  }

}
