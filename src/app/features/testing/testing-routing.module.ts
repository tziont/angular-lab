import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestingHomeComponent } from './pages/testing-home/testing-home.component';

const routes: Routes = [
  {
    path: '',
    component: TestingHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestingRoutingModule {}