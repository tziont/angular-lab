import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; // ✅ add this
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptor } from './core/interceptors/logging-interceptor.service';
import { ErrorHandlingInterceptor } from './core/interceptors/error-handling-interceptor.service';
import { AuthInterceptor } from './core/interceptors/auth.-interceptor.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { counterReducer } from './features/advanced/ngrx/state/counter.reducer';
import { CounterEffects } from './features/advanced/ngrx/state/counter.effects';


@NgModule({
  declarations: [
    AppComponent,
       ],
  imports: [
    BrowserModule,
    
    HttpClientModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({counter:counterReducer}),
    EffectsModule.forRoot([CounterEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
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
