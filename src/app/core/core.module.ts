import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from '../shared/shared.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';
import { GlobalErrorHandler } from './handlers/global-error-handler';
import { HttpLoadingInterceptor } from './interceptors/http-loading-interceptor';



@NgModule({
  providers:[
    {
      // processes all errors
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    {
      // interceptor to show loading spinner
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoadingInterceptor,
      multi: true,
    },
  ],
  declarations: [
    NavigationComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    SharedModule,
    HttpClientModule,
  ],
  exports: [
    NavigationComponent,
  ]
})
export class CoreModule { }
