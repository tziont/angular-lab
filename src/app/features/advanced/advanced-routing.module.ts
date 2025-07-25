import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancedHomeComponent } from './pages/advanced-home/advanced-home.component';
import { SettingsTaskComponent } from './pages/settings-page/settings-task';
import { StateManagementComponent } from './pages/state-management-page/state-management';
import { ComponentStateComponent } from './pages/state-management-page/components/component-state/component-state.component';
import { ServiceStateComponent } from './pages/state-management-page/components/service-state/service-state.component';
import { RxjsVsSignalsComponent } from './pages/state-management-page/components/rxjs-vs-signals/rxjs-vs-signals.component';
import { GlobalPatternComponent } from './pages/state-management-page/components/global-pattern/global-pattern.component';
const routes: Routes = [
  {
    path: '',
    component: AdvancedHomeComponent,
  },
  {
    path: 'settings-page',
    component: SettingsTaskComponent,
  },
  {
    path: 'state-management',
    component: StateManagementComponent,
    children: [
      {
        path: 'component-state',
        component: ComponentStateComponent,
      },
      {
        path: 'service-state',
        component: ServiceStateComponent,
      },
      {
        path: 'rxjs-vs-signals',
        component: RxjsVsSignalsComponent,
      },
      {
        path: 'global-pattern',
        component: GlobalPatternComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvancedRoutingModule {}
