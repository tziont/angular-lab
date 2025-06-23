import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { SettingTaskService } from '../../../../../core/services/setting-task.service';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Settings, Setting, Role } from '../../../../../types/setting.model';
@Component({
  selector: 'app-task-container',
  standalone: false,
  templateUrl: './task-container.component.html',
  styleUrl: './task-container.component.scss',
})
export class TaskContainerComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;
  role = Role.Admin;
  settings!: Settings;
  settingsSubscription!: Subscription;

  form!: FormGroup;

  settings$!: Observable<Settings>;

  constructor(private getTaskSetting: SettingTaskService) {}

  ngOnInit(): void {
    this.form = new FormGroup({});
  }
  showTask(): void {
    if (!this.settingsSubscription) {
      this.settingsSubscription = this.getTaskSetting
        .getSettings()
        .subscribe((data) => {
          this.settings = data;
        });
      console.log('fecth data');
    }
  }
  saveSettings() {
    const values = this.form.getRawValue();
    this.settings.forEach((setting) => {
      const control = this.form.get(setting.key);
      if (control?.dirty) {
        const updatedSetting = {
          ...setting,
          value: values[setting.key],
        };
        this.getTaskSetting.saveSettings(updatedSetting).subscribe();
      }
    });
  }
}
