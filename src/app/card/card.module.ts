import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardRoutingModule } from './card-routing.module';
import { CardComponent } from './card.component';
import { SharedModule } from '../shared/shared.module';
import { CardListComponent } from './pages/card-list/card-list.component';
import { CardService } from './services/card.service';
import { CardFormComponent } from './components/card-form/card-form.component';
import { CardDetailsComponent } from './pages/card-details/card-details.component';
import { CardCardComponent } from './components/card-card/card-card.component';


@NgModule({
  declarations: [
    CardComponent,
    CardListComponent,
    CardFormComponent,
    CardDetailsComponent,
    CardCardComponent,
  ],
  imports: [
    CommonModule,
    CardRoutingModule,
    SharedModule,
  ],
  providers: [
    CardService,
  ]
})
export class CardModule { }
