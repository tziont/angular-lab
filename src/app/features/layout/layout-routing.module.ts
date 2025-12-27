import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { HomeComponent } from '../layout/pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { 
        path: '', component: HomeComponent,
      },
      {
        path: 'components',
        loadChildren: () =>
          import('../components/components.module').then(
            (m) => m.ComponentsModule
          ),
      },
      {
        path: 'services',
        loadChildren: () =>
          import('../services/services.module').then(
            (m) => m.ServicesModule
          ),
      },
      {
        path: 'routing',
        loadChildren: () =>
          import('../routing/routing.module').then(
            (m) => m.RoutingModule
          ),
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('../forms/forms.module').then((m) => m.FormsModule),
      },
      {
        path: 'rxjs',
        loadChildren: () =>
          import('../rxjs/rxjs.module').then((m) => m.RxjsModule),
      },
      {
        path: 'interceptors',
        loadChildren: () =>
          import('../interceptors/interceptors.module').then(
            (m) => m.InterceptorsModule
          ),
      },
      {
        path: 'directives',
        loadChildren: () =>
          import('../directives/directives.module').then(
            (m) => m.DirectivesModule
          ),
      },
      {
        path: 'guards',
        loadChildren: () =>
          import('../guards/guards.module').then(
            (m) => m.GuardsModule
          ),
      },
      {
        path: 'signals',
        loadChildren: () =>
          import('../signals/signals.module').then(
            (m) => m.SignalsModule
          ),
      },
      {
        path: 'testing',
        loadChildren: () =>
          import('../testing/testing.module').then(
            (m) => m.TestingModule
          ),
      },
      {
        path: 'ai',
        loadChildren: () =>
          import('../ai/ai.modules').then(
            (m) => m.AiModule
          ),
      },
      {
        path: 'advanced',
        loadChildren: () =>
          import('../advanced/advanced.module').then(
            (m) => m.AdvancedModule
          ),
      },
      // Add more topic routes here as we progress...
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}