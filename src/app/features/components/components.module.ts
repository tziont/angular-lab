import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { ComponentsHomeComponent } from './pages/components-home.component';
import { CardComponent } from './ui/card.component';


@NgModule({
  declarations: [
    ComponentsHomeComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule
  ]
})
export class ComponentsModule { }
