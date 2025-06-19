import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancedHomeComponent } from './pages/advanced-home/advanced-home.component';
import { SettingsTaskComponent } from './pages/settings-page/settings-task';

const routes: Routes = [
  {
    path: '',
    component:AdvancedHomeComponent
 },
 {
    path: 'settings-page',
    component:SettingsTaskComponent
 },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvancedRoutingModule { }
