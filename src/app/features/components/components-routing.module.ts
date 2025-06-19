import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsHomeComponent } from './pages/components-home.component';
import { SmartVsDumbComponent } from './pages/smart-vs-dumb/smart-vs-dumb.component';
import { StandaloneComponent } from './pages/standalone/standalone.component';
import { CommunicationComponent } from './pages/communication/communication.component';
import { LifecycleComponent } from './pages/lifecycle/lifecycle.component';

const routes: Routes = [
  {
    path: '',
    component: ComponentsHomeComponent
  },
  {
    path: 'smart-vs-dumb',
    component: SmartVsDumbComponent
  },
  {
    path: 'standalone',
    component: StandaloneComponent
  },
  {
    path: 'communication',
    component: CommunicationComponent
  },
  {
    path: 'lifecycle',
    component: LifecycleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
