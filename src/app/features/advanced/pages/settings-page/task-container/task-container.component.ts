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
import { TestService } from '../../../../../core/services/test.service';
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
  constructor(private settingTaskService: SettingTaskService, private authService: AuthService,private testService:TestService) {}

  ngOnInit(): void {
    this.form = new FormGroup({});
    this.role = this.authService.getUser()?.role ?? 'User';
    console.log('Role------------------->',this.role);
  }

  showTask(): void {
// just a temp test for auth interseptor
this.testService.getProtected().subscribe({
  next: (res) => console.log('Protected response:', res),
  error: (err) => console.error('Protected error:', err),
});
// end test
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
