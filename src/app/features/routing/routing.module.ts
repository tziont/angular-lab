import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutingRoutingModule } from './routing-routing.module';
import { RoutingHomeComponent } from './pages/routing-home.component';
import { ParentComponent } from './pages/preperation/parent.component';
import { ChildComponent } from './pages/preperation/child.component';


@NgModule({
  declarations: [
    RoutingHomeComponent,
    ParentComponent,
    ChildComponent
  ],
  imports: [
    CommonModule,
    RoutingRoutingModule
  ]
})
export class RoutingModule { }
