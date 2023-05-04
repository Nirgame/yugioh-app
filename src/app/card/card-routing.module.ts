import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './card.component';
import { CardListComponent } from './pages/card-list/card-list.component';
import { CardDetailsComponent } from './pages/card-details/card-details.component';

const routes: Routes = [
  {
    path: '',
    component: CardListComponent
  },
  {
    path: ':id',
    component: CardDetailsComponent
  }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardRoutingModule { }
