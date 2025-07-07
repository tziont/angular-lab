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
  role = Role.User;
  settings!: Settings;
  form!: FormGroup;
  settings$!: Observable<Settings>;

  constructor(private settingTaskService: SettingTaskService) {}

  ngOnInit(): void {
    this.form = new FormGroup({});
  }
  showTask(): void {
      this.settingTaskService
        .getSettings()
        .subscribe((data) => {
          this.settings = data;
        });
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
        this.settingTaskService.saveSettings(updatedSetting).subscribe();
      }
    });
  }
}
