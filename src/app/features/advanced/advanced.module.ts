import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedHomeComponent } from './pages/advanced-home/advanced-home.component';
import { AdvancedRoutingModule} from './advanced-routing.module';
import { TaskContainerComponent } from './pages/settings-page/task-container/task-container.component';
import { SettingsTaskComponent } from './pages/settings-page/settings-task';
import { TaskComponent } from './pages/settings-page/task/task.component';
import {  HttpClientModule } from '@angular/common/http';
import { ToggleComponent } from './pages/settings-page/components/toggle/toggle.component';
import { SelectComponent } from './pages/settings-page/components/select/select.component';
import { TextComponent } from './pages/settings-page/components/text/text.component';
import {  ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [AdvancedHomeComponent,TaskContainerComponent,SettingsTaskComponent, TaskComponent, TextComponent,ToggleComponent,SelectComponent ],
  imports: [
    CommonModule,
    AdvancedRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ]
})
export class AdvancedModule { }
