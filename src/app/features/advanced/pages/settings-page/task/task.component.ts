import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ViewContainerRef,
  OnChanges,
  SimpleChanges,
  ComponentRef,
} from '@angular/core';

import { Settings, Setting, Role } from '../../../../../types/setting.model';
import { TextComponent } from '../components/text/text.component';
import { ToggleComponent } from '../components/toggle/toggle.component';
import { SelectComponent } from '../components/select/select.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})

export class TaskComponent implements OnChanges {
  @Input() settings: Settings | undefined;
  @Input() form!: FormGroup;
  @Input() isGeneralOpen!: boolean;
  @Input() isAppearanceOpen!: boolean;
  @Input() isDisplayOpen!: boolean;
  @Input() isContainerOpen!: boolean;
  @Input() isShowDisplay!: boolean;
  @Input() isPermite!: boolean;
  @Input() isShowAppearance!: boolean;
  @Input() isShowGeneral!: boolean;
  @Input() role!: Role;
  @Output() click = new EventEmitter<void>();
  @Output() saveSettings = new EventEmitter<void>();

  settingsMap = new Map<string, Setting>();

  @ViewChild('display', { read: ViewContainerRef })
  display!: ViewContainerRef;
  @ViewChild('appearance', { read: ViewContainerRef })
  appearance!: ViewContainerRef;
  @ViewChild('general', { read: ViewContainerRef })
  general!: ViewContainerRef;

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

  setSettings() {
    this.saveSettings.emit();
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

  toggleExpander(group: string): void {
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
  //TBD check how to do that using map
  checkPermission(element: Setting) {
    return element.roles.includes(this.role);
  }

  createComponent(
    component: any,
    control: FormControl,
    container: ViewContainerRef
  ) {
    // 👇 Just create the component — DO NOT pass control here
    const compRef = container.createComponent(component);
    // 👇 Then assign the control
    (compRef.instance as any).control = control;
    compRef.changeDetectorRef.detectChanges(); // force Angular to update input
    return compRef;
  }
  
  selectComponentAndGroup(component: any, element: Setting) {
    const control = new FormControl(element.value ?? null);
    if (!this.form.contains(element.key)) {
      this.form.addControl(element.key, control);
    }
    const container =
      element.group.toLocaleLowerCase() === 'general'
        ? this.general
        : element.group.toLocaleLowerCase() === 'appearance'
        ? this.appearance
        : this.display;

    return this.createComponent(component, control, container);
  }

  updateGroupMap(element: Setting) {
    if (!this.settingsMap.has(element.key)) {
      this.settingsMap.set(element.key, element);
    }
  }

  setBasicInputs(componentRef: ComponentRef<any>, element: Setting) {
    componentRef.setInput('key', element.key);
    componentRef.setInput('label', element.label);
    componentRef.setInput('value', element.value);
    if (element.metadata && 'options' in element.metadata) {
      componentRef.setInput('options', element.metadata?.options || []);
    }
  }
}
