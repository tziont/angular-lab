import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignalsHomeComponent } from './pages/signals-home/signals-home.component';

const routes: Routes = [
  {
    path: '',
    component: SignalsHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignalsRoutingModule {}