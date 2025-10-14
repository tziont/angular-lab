import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancedHomeComponent } from './pages/advanced-home/advanced-home.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { SettingsTaskComponent } from './pages/settings-page/settings-task';
import { StateManagementComponent } from './pages/state-management-page/state-management.component';
import { ComponentStateComponent } from './pages/state-management-page/components/component-state/component-state.component';
import { ServiceStateComponent } from './pages/state-management-page/components/service-state/service-state.component';
import { RxjsVsSignalsComponent } from './pages/state-management-page/components/rxjs-vs-signals/rxjs-vs-signals.component';
import { GlobalPatternComponent } from './pages/state-management-page/components/global-pattern/global-pattern.component';
import { RoleGuard } from '../../core/guards/role.guard';
import { NgrxComponent} from './pages/ngrx-page/ngrx.component';
import { NgrxActionsComponent } from './pages/ngrx-page/components/ngrx-actions/ngrx-actions/ngrx-actions.component';
import { NgrxReducersComponent } from './pages/ngrx-page/components/ngrx-reducers/ngrx-reducers.component';
import { NgrxSelectorsComponent } from './pages/ngrx-page/components/ngrx-selectors/ngrx-selectors.component';
import { NgrxEffectsComponent } from './pages/ngrx-page/components/ngrx-effects/ngrx-effects.component';
const routes: Routes = [
  {
    path: '',
    component: AdvancedHomeComponent,
  },
  {
    path: 'settings-page',
    component: SettingsTaskComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Admin', 'Editor'] } // ✅ match your backend logic
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
  {
    path: 'ngrx',
    component: NgrxComponent,
    children: [
      {
        path: 'ngrx-actions',
        component: NgrxActionsComponent,
      },
      {
        path: 'ngrx-reducers',
        component: NgrxReducersComponent,
      },
      {
        path: 'ngrx-selectors',
        component: NgrxSelectorsComponent,
      },
      {
        path: 'ngrx-effects',
        component: NgrxEffectsComponent,
      },
    ],
  },{
    path: 'forbidden',
    component: ForbiddenComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvancedRoutingModule {}
