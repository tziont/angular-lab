import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './pages/home/home.component';

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
          import('../features/components/components.module').then(
            (m) => m.ComponentsModule
          ),
      },
      {
        path: 'app/services',
        loadChildren: () =>
          import('../features/services/services.module').then(
            (m) => m.ServicesModule
          ),
      },
      {
        path: 'routing',
        loadChildren: () =>
          import('../features/routing/routing.module').then(
            (m) => m.RoutingModule
          ),
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('../features/forms/forms.module').then((m) => m.FormsModule),
      },
      {
        path: 'rxjs',
        loadChildren: () =>
          import('../features/rxjs/rxjs.module').then((m) => m.RxjsModule),
      },
      {
        path: 'interceptors',
        loadChildren: () =>
          import('../features/interceptors/interceptors.module').then(
            (m) => m.InterceptorsModule
          ),
      },
      {
        path: 'directives',
        loadChildren: () =>
          import('../features/directives/directives.module').then(
            (m) => m.DirectivesModule
          ),
      },
      {
        path: 'guards',
        loadChildren: () =>
          import('../features/guards/guards.module').then(
            (m) => m.GuardsModule
          ),
      },
      {
        path: 'signals',
        loadChildren: () =>
          import('../features/signals/signals.module').then(
            (m) => m.SignalsModule
          ),
      },
      {
        path: 'testing',
        loadChildren: () =>
          import('../features/testing/testing.module').then(
            (m) => m.TestingModule
          ),
      },
      {
        path: 'ai',
        loadChildren: () =>
          import('../features/ai/ai.modules').then(
            (m) => m.AiModule
          ),
      },
      {
        path: 'advanced',
        loadChildren: () =>
          import('../features/advanced/advanced.module').then(
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