import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorIntercept } from './core/interceptors/error.interceptor';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorIntercept,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
     useClass: LoaderInterceptor, 
     multi:true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
