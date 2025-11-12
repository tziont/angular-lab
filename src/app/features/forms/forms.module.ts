import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsRoutingModule } from './forms-routing.module';
import { FormsHomeComponent } from './pages/forms-home/forms-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveFormComponent } from './pages/forms-home/reactive/reactive-form.component.component';
import { CustomValidatorComponent } from './pages/forms-home/custom-validators/custom-valodator.component.component';
@NgModule({
  declarations: [
    FormsHomeComponent,
    ReactiveFormComponent,
    CustomValidatorComponent,
  ],
  imports: [CommonModule, FormsRoutingModule, ReactiveFormsModule],
})
export class FormsModule {}
