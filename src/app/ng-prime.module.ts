import { NgModule } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import {DialogModule} from 'primeng/dialog';
import { PaginatorModule} from 'primeng/paginator';
import {CheckboxModule} from 'primeng/checkbox';
import {MultiSelectModule} from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {RadioButtonModule} from 'primeng/radiobutton';
import { SplitButtonModule } from 'primeng/splitbutton';
import {ConfirmDialogModule} from 'primeng/confirmdialog';


const NGPRIME_MODULES = [
  InputTextModule,
  ButtonModule,
  DropdownModule,
  CalendarModule,
  TabMenuModule,
  TableModule,
  DialogModule,
  PaginatorModule,
  CheckboxModule,
  MultiSelectModule,
  OverlayPanelModule,
  ToggleButtonModule,
  RadioButtonModule,
  SplitButtonModule,
  ConfirmDialogModule,
];
const CDK_MODULES: any = [];

@NgModule({
  imports: [CDK_MODULES, NGPRIME_MODULES],
  exports: [CDK_MODULES, NGPRIME_MODULES],
})
export class NgPrimeModule {}
