import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedHomeComponent } from './pages/advanced-home/advanced-home.component';
import { AdvancedRoutingModule } from './advanced-routing.module';
import { TaskContainerComponent } from './pages/settings-page/task-container/task-container.component';
import { SettingsTaskComponent } from './pages/settings-page/settings-task';
import { TaskComponent } from './pages/settings-page/task/task.component';
import { HttpClientModule } from '@angular/common/http';
import { ToggleComponent } from './pages/settings-page/components/toggle/toggle.component';
import { SelectComponent } from './pages/settings-page/components/select/select.component';
import { TextComponent } from './pages/settings-page/components/text/text.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentStateComponent } from './pages/state-management-page/components/component-state/component-state.component'; 
import { StateManagementComponent } from './pages/state-management-page/state-management.component';
import { RouterModule } from '@angular/router';
import { RxjsVsSignalsComponent } from './pages/state-management-page/components/rxjs-vs-signals/rxjs-vs-signals.component';
import { NgrxComponent} from './pages/ngrx-page/ngrx.component';
import { GlobalPatternComponent } from './pages/state-management-page/components/global-pattern/global-pattern.component';
import { NgrxActionsComponent } from './pages/ngrx-page/components/ngrx-actions/ngrx-actions/ngrx-actions.component';
import { CounterDemoComponent } from './pages/ngrx-page/components/counter-demo/counter-demo.component';
import { CounterDemoSelectorsComponent } from './pages/ngrx-page/components/counter-demo-selector/counter-demo-selectors.component';
import { NgrxReducersComponent } from './pages/ngrx-page/components/ngrx-reducers/ngrx-reducers.component';

import { NgrxSelectorsComponent } from './pages/ngrx-page/components/ngrx-selectors/ngrx-selectors.component';
@NgModule({
  declarations: [
    AdvancedHomeComponent,
    TaskContainerComponent,
    SettingsTaskComponent,
    TaskComponent,
    TextComponent,
    ToggleComponent,
    SelectComponent,
    ComponentStateComponent,
    StateManagementComponent,
    NgrxComponent,
    RxjsVsSignalsComponent,
    GlobalPatternComponent,
    NgrxActionsComponent,
    CounterDemoComponent,
    CounterDemoSelectorsComponent,
    NgrxReducersComponent,
    NgrxSelectorsComponent,
  ],
  imports: [
    CommonModule,
    AdvancedRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class AdvancedModule {}
