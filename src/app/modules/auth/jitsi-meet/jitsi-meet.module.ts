import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JitsiMeetComponent } from './jitsi-meet.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutRoutes } from 'src/app/constants/routes';
import { JitsiModule } from 'src/app/shared/modules/jitsi/jitsi.module';

const routes: Routes = [
  {
    path: LayoutRoutes.VIEW_WITH_ID,
    component: JitsiMeetComponent
  }
]


@NgModule({
  declarations: [
    JitsiMeetComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    JitsiModule
  ]
})
export class JitsiMeetModule { }
