import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutingHomeComponent } from './pages/routing-home.component';
import { ParentComponent } from './pages/preperation/parent.component';

const routes: Routes = [
  {
    path: '',
    component: ParentComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingRoutingModule { }
