import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardsHomeComponent } from './pages/guards-home/guards-home.component';

const routes: Routes = [
  {
    path: '',
    component: GuardsHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuardsRoutingModule {}