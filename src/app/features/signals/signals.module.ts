import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalsHomeComponent } from './pages/signals-home/signals-home.component';
import { SignalsRoutingModule } from './signals-routing.module';



@NgModule({
  declarations: [SignalsHomeComponent],
  imports: [
    CommonModule,
    SignalsRoutingModule
  ]
})
export class SignalsModule { }
