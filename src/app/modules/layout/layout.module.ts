import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarModule } from 'src/app/shared/modules/sidebar/sidebar.module';
import { HeaderModule } from 'src/app/shared/modules/header/header.module';
import { NgPrimeModule } from 'src/app/ng-prime.module';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    HeaderModule,
    SidebarModule,
    NgPrimeModule
  ]
})
export class LayoutModule { }
