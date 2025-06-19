import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { SettingTaskService } from '../../../../../core/services/setting-task.service';
import { Observable, Subscription } from 'rxjs';

import { Settings } from '../../../../../types/setting.model';

@Component({
  selector: 'app-task-container',
  standalone: false,
  templateUrl: './task-container.component.html',
  styleUrl: './task-container.component.scss',
})
export class TaskContainerComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  settings!: Settings;
  private settingsSubscription!: Subscription;

  settings$!: Observable<Settings>;

  constructor(private getTaskSetting: SettingTaskService) {}

  ngOnInit(): void {
    
  }
   showTask(): void {
     if (!this.settingsSubscription) {
      this.settingsSubscription = this.getTaskSetting
        .getSettings()
        .subscribe((data) => (this.settings = data));
      console.log('fecth data');
     }
   }
}
