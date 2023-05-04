import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
 {
   path: '',
   redirectTo: 'menu',
   pathMatch: 'full' 
 },
 {
  path: 'menu',
  loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule)
 },
 {
   path: 'cards',
   loadChildren: () => import('./card/card.module').then(m => m.CardModule)
 },
 {
  path: 'users',
  loadChildren: () => import('./user/user.module').then(m => m.UserModule)
},
 {
 path : '**', //redirige si on écris n'importe quoi
 component: NotFoundComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

