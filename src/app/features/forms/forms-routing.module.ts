import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsHomeComponent } from './pages/forms-home/forms-home.component';
import { ReactiveFormComponent } from './pages/forms-home/reactive/reactive-form.component.component';
import { CustomValidatorComponent } from './pages/forms-home/custom-validators/custom-valodator.component.component';

const routes: Routes = [
  {
    path: '',
    component: FormsHomeComponent
  },
  {
    path: 'reactive',
    component: ReactiveFormComponent
  },
  {
    path: 'validation',
    component: CustomValidatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
