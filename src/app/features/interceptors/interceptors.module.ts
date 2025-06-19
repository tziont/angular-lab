import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { InterceptorsHomeComponent } from './pages/interceptors-home/interceptors-home.component';
import { InterceptorsRoutingModule} from './interceptors-routing.module';
import { BasicInterceptorComponent } from './pages/basic-interceptor/basic-interceptor.component'
import { BasicInterceptorDemoComponent } from './pages/basic-interceptor/basic-interceptor-demo.component';
import { GlobalErrorHandlingInterceptorComponent } from './pages/global-error-handling-interceptor/global-error-handling-interceptor.component';
import { GlobalErrorHandlingInterceptorDemoComponent } from './pages/global-error-handling-interceptor/global-error-handling-interceptor-demo.component';

@NgModule({
  declarations: [InterceptorsHomeComponent, BasicInterceptorComponent, BasicInterceptorDemoComponent, GlobalErrorHandlingInterceptorComponent, GlobalErrorHandlingInterceptorDemoComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    InterceptorsRoutingModule
  ]
})
export class InterceptorsModule { }
