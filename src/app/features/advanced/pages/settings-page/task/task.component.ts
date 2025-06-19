import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ViewContainerRef,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { Settings, Setting, Role } from '../../../../../types/setting.model';
import { TextComponent } from '../components/text/text.component';
import { ToggleComponent } from '../components/toggle/toggle.component';
import { SelectComponent } from '../components/select/select.component';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnChanges, OnInit {
  @Input() settings: Settings | undefined;
  @Output() click = new EventEmitter<void>();
  isGeneralOpen = false;
  isAppearanceOpen = false;
  isDisplayOpen = false;
  isContainerOpen = false;
  role!: Role;
  isPermite = false;
  isShowDisplay = false;
  isShowAppearance = false;
  isShowGeneral = false;

  @ViewChild('display', { read: ViewContainerRef })
  display!: ViewContainerRef;
  @ViewChild('appearance', { read: ViewContainerRef })
  appearance!: ViewContainerRef;
  @ViewChild('general', { read: ViewContainerRef })
  general!: ViewContainerRef;
  settingsMap = new Map<string, Setting>();

  ngOnInit() {
    this.role = Role.User;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['settings']) {
      this.creatingComponentsByType();
    }
    if (this.appearance && this.appearance.length) {
      this.isShowAppearance = true;
    }
    if (this.display && this.display.length) {
      this.isShowDisplay = true;
    }
    if (this.general && this.general.length) {
      this.isShowGeneral = true;
    }
  }

  getSetting() {
    this.click.emit();
  }

  creatingComponentsByType() {
    if (!!this.settings && this.settings.length) {
      this.isContainerOpen = true;
      this.settings.forEach((element) => {
        this.updateGroupMap(element);
        if (this.checkPermission(element)) {
          switch (element.type.toLowerCase()) {
            case 'select':
              const selectedComponent = this.selectComponentAndGroup(
                SelectComponent,
                element
              );
              this.setBasicInputs(selectedComponent, element);
              break;
            case 'toggle':
              const toggleComponent = this.selectComponentAndGroup(
                ToggleComponent,
                element
              );
              this.setBasicInputs(toggleComponent, element);
              break;
            case 'text':
              const textComponent = this.selectComponentAndGroup(
                TextComponent,
                element
              );
              this.setBasicInputs(textComponent, element);
          }
        }
      });
    }
  }

  toggle(group: string): void {
    switch (group) {
      case 'general':
        this.isGeneralOpen = !this.isGeneralOpen;
        break;
      case 'appearance':
        this.isAppearanceOpen = !this.isAppearanceOpen;
        break;
      case 'display':
        this.isDisplayOpen = !this.isDisplayOpen;
    }
  }
  // check how to do that using map
  checkPermission(element: Setting) {
    return element.roles.includes(this.role);
  }

  selectComponentAndGroup(component: any, element: Setting) {
    return element.group.toLocaleLowerCase() === 'general'
      ? this.general.createComponent(component)
      : element.group.toLocaleLowerCase() === 'appearance'
      ? this.appearance.createComponent(component)
      : this.display.createComponent(component);
  }

  updateGroupMap(element: Setting) {
    if (!this.settingsMap.has(element.key)) {
      this.settingsMap.set(element.key, element);
    }
  }

  setBasicInputs(componentType: any, element: Setting) {
    const selectedComponent = componentType;
    selectedComponent.setInput('key', element.key);
    selectedComponent.setInput('label', element.label);
    selectedComponent.setInput('roles', element.roles);
    selectedComponent.setInput('value', element.value);
    selectedComponent.setInput('group', element.group);
    if (element.metadata && 'options' in element.metadata) {
      selectedComponent.setInput('options', element.metadata?.options || []);
    }
  }

  saveSettings(){}
}
