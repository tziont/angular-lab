import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuardsHomeComponent } from './pages/guards-home/guards-home.component';
import { GuardsRoutingModule } from './guards-routing.module';



@NgModule({
  declarations: [
    GuardsHomeComponent
  ],
  imports: [
    CommonModule,
    GuardsRoutingModule
  ]
})
export class GuardsModule { }
