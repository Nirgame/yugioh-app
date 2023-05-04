import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserComponent } from './user.component';
import { UserService } from './services/user.service';
import { CardService } from '../card/services/card.service';


@NgModule({
  declarations: [
    UserComponent,
    UserListComponent,
    UserDetailsComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  providers: [
    UserService,
    CardService
  ],
})
export class UserModule { }
