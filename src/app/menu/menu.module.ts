import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MenuComponent } from './menu.component';


@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    SharedModule
  ]
})
export class MenuModule { }
