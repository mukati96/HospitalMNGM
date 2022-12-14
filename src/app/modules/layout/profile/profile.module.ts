import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPrimeModule } from 'src/app/ng-prime.module';
import { LowerCaseModule } from 'src/app/shared/directives/lower-case/lower-case.module';
import { HeaderModule } from "../../../shared/modules/header/header.module";
import { SidebarModule } from "../../../shared/modules/sidebar/sidebar.module";


@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgPrimeModule,
        LowerCaseModule,
        HeaderModule,
        SidebarModule
    ]
})
export class ProfileModule { }
