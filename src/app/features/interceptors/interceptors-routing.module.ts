import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterceptorsHomeComponent } from './pages/interceptors-home/interceptors-home.component';
import { GlobalErrorHandlingInterceptorComponent } from './pages/global-error-handling-interceptor/global-error-handling-interceptor.component';
import { BasicInterceptorComponent } from './pages/basic-interceptor/basic-interceptor.component';
const routes: Routes = [
  {
    path: '',
    component: InterceptorsHomeComponent
 },
{
  path: 'basic',
  component: BasicInterceptorComponent
},
{
  path: 'error-handling-interceptor',
  component: GlobalErrorHandlingInterceptorComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterceptorsRoutingModule { }
