import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxjsRoutingModule } from './rxjs-routing.module';
import { RxjsHomeComponent } from './pages/rxjs-home/rxjs-home.component';
import { ErrorHandlingComponent } from './pages/error-handling/error-handling.component';
import { ObservablesComponent } from './pages/observables/observables.component';
import { OperatorsComponent } from './pages/operators/operators.component';
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { ObservableDemoComponent } from './pages/observables/observable-demo.component';
import { SubjectDemoComponent } from './pages/subjects/subject-demo.component';
import {BehaviorsubjectComponent} from './pages/subjects/behaviorsubject.component';
import {MapDemoComponent} from './pages/operators/map-demo/map-demo.component';
import {TapDemoComponent} from './pages/operators/tap-demo/tap-demo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterDemoComponent } from './pages/operators/filter-demo/filter-demo.component';
import { SwitchMapDemoComponent } from './pages/operators/switch-map-demo/switch-map-demo.component';

@NgModule({
  declarations: [
    RxjsHomeComponent,
    ErrorHandlingComponent,
    ObservablesComponent,
    OperatorsComponent,
    SubjectsComponent,
    ObservableDemoComponent,
    SubjectDemoComponent,
    BehaviorsubjectComponent,
    MapDemoComponent,
    FilterDemoComponent,
    TapDemoComponent,
    SwitchMapDemoComponent
  ],
  imports: [
    RxjsRoutingModule,
    CommonModule,
    ReactiveFormsModule 
    
  ]
})
export class RxjsModule { }
