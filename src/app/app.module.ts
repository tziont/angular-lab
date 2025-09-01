import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; // ✅ add this
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptor } from './core/interceptors/logging-interceptor.service';
import { ErrorHandlingInterceptor } from './core/interceptors/error-handling-interceptor.service';
import { AuthInterceptor } from './core/interceptors/auth.-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
       ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlingInterceptor,
      multi: true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
