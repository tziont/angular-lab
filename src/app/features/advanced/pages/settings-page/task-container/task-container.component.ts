import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { SettingTaskService } from '../../../../../core/services/setting-task.service';
import { Observable, Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Settings, Role } from '../../../../../types/setting.model';

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
  prevFormValues!: any;
  constructor(private settingTaskService: SettingTaskService) {}

  ngOnInit(): void {
    this.form = new FormGroup({});
  }

  showTask(): void {
    this.settingTaskService.getSettings().subscribe((data) => {
      this.settings = data;
      // ✅ Save the original values as reference
      this.prevFormValues = data.reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {} as Record<string, any>);
    });
  }

  saveSettings() {
    const previous = this.prevFormValues;
    const current = this.form.getRawValue();
    this.settings.forEach((setting) => {
      const key = setting.key;
      const oldValue = previous[key];
      const newValue = current[key];
      const changed = !this.areEqual(oldValue, newValue);
      if (changed) {
        const updatedSetting = {
          ...setting,
          value: current[setting.key],
        };
        this.settingTaskService.saveSettings(updatedSetting).subscribe();
      }
    });
    this.prevFormValues = { ...current };
  }

  areEqual(a: any, b: any): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
  }
}
