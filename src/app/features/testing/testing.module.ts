import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestingHomeComponent } from './pages/testing-home/testing-home.component';
import { TestingRoutingModule } from './testing-routing.module';



@NgModule({
  declarations: [
    TestingHomeComponent
  ],
  imports: [
    CommonModule,
    TestingRoutingModule
  ]
})
export class TestingModule { }
