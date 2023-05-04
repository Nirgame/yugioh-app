import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardRoutingModule } from './card-routing.module';
import { CardComponent } from './card.component';
import { SharedModule } from '../shared/shared.module';
import { CardListComponent } from './pages/card-list/card-list.component';
import { CardService } from './services/card.service';
import { CardFormComponent } from './components/card-form/card-form.component';
import { CardDetailsComponent } from './pages/card-details/card-details.component';
import { UserService } from '../user/services/user.service';


@NgModule({
  declarations: [
    CardComponent,
    CardListComponent,
    CardFormComponent,
    CardDetailsComponent,
  ],
  imports: [
    CommonModule,
    CardRoutingModule,
    SharedModule,
  ],
  providers: [
    CardService,
    UserService
  ]
})
export class CardModule { }
