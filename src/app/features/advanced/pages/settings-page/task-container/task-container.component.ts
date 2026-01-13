import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { SettingTaskService } from '../../../../../core/services/setting-task.service';
import { Observable, Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Settings,Role} from '../../../../../types/setting.model';
import { AuthService } from '../../../../../core/services/auth.service';
import { User} from '../../../../../types/user.model';

@Component({
  selector: 'app-task-container',
  standalone: false,
  templateUrl: './task-container.component.html',
  styleUrl: './task-container.component.scss',
})
export class TaskContainerComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;
  role!:Role;  
  settings!: Settings;
  form!: FormGroup;
  settings$!: Observable<Settings>;
  prevFormValues!: any;
  errorMessage="";
  private areEqual(a: any, b: any): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}
  constructor(private settingTaskService: SettingTaskService, private authService: AuthService) {}

  ngOnInit(): void {
    this.form = new FormGroup({});
    this.role = this.authService.getUser()?.role ?? 'User';
    console.log('Role------------------->',this.role);
  }

  showTask(): void {
    this.settingTaskService.getSettings().subscribe({
      next:(data) => {
      this.settings = data;
      // ✅ Save the original values as reference
      this.prevFormValues = data.reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {} as Record<string, any>);
    },
  error:(err) => {
        if (err.status === 403) {
          this.errorMessage = 'You are not authorized to view settings.';
        } else {
          this.errorMessage = 'Something went wrong. Please try again later.';
        }
      }});
  }

saveSettings() {
  const previous = this.prevFormValues;
  const current = this.form.getRawValue();

  // collect only changed settings
  const changedSettings = this.settings
    .filter(setting => !this.areEqual(previous[setting.key], current[setting.key]))
    .map(setting => ({
      ...setting,
      ...current[setting.key] instanceof Object ? current[setting.key] : { value: current[setting.key] }
    }));

  if (changedSettings.length > 0) {
    this.settingTaskService.saveSettings(changedSettings).subscribe(updated => {
      console.log('Updated settings:', updated);
      // update prevFormValues
      this.prevFormValues = { ...current };
    });
  } else {
    this.prevFormValues = { ...current };
  }
}
}
