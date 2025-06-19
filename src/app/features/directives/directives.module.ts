import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesHomeComponent } from './pages/directives-home/directives-home.component';
import { DirectivesRoutingModule } from './directives-routing.module';



@NgModule({
  declarations: [DirectivesHomeComponent],
  imports: [
    CommonModule,
    DirectivesRoutingModule
  ]
})
export class DirectivesModule { }
