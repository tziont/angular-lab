import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RxjsHomeComponent } from './pages/rxjs-home/rxjs-home.component';
import { ErrorHandlingComponent } from './pages/error-handling/error-handling.component';
import { ObservablesComponent } from './pages/observables/observables.component';
import { OperatorsComponent } from './pages/operators/operators.component';
import { SubjectsComponent } from './pages/subjects/subjects.component';

const routes: Routes = [
  {
    path: '',
    component: RxjsHomeComponent,
  },
  {
    path: 'error-handling',
    component: ErrorHandlingComponent,
  },
  {
    path: 'observables',
    component: ObservablesComponent,
  },
  {
    path: 'operators',
    component: OperatorsComponent,
  },
  {
    path: 'subjects',
    component: SubjectsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RxjsRoutingModule {}