import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
  ViewContainerRef,
  OnChanges,
  AfterViewInit,
  SimpleChanges,
  Type,
  ComponentRef,
  ChangeDetectorRef,
} from '@angular/core';

import {
  Settings,
  Setting,
  Role,
  SettingType,
} from '../../../../../types/setting.model';

import { TextComponent } from '../components/text/text.component';
import { ToggleComponent } from '../components/toggle/toggle.component';
import { SelectComponent } from '../components/select/select.component';
import { FormControl, FormGroup } from '@angular/forms';

const COMPONENT_MAP: Record<SettingType, Type<any>> = {
  [SettingType.Toggle]: ToggleComponent,
  [SettingType.Text]: TextComponent,
  [SettingType.Select]: SelectComponent,
};

@Component({
  standalone: false,
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements AfterViewInit, OnChanges {
  @Input() settings: Settings | undefined;
  @Input() form!: FormGroup;
  @Input() role!: Role;
  @Output() requestSettings = new EventEmitter<void>();
  @Output() saveSettings = new EventEmitter<void>();
 

  @ViewChildren('groupHost', { read: ViewContainerRef })
  viewContainers!: QueryList<ViewContainerRef>;

  expanderStates: Record<string, boolean> = {};
  groupedMap = new Map<string, Setting[]>();
  groupedArrayData: Array<{ name: string; group: Setting[] }> = [];

  private viewReady = false;
  private settingsChanged = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['settings']) {
      this.settingsChanged = true;
      if (this.viewReady) {
        this.updateAndRender();
      }
    }
  }

  ngAfterViewInit(): void {
    
    this.viewReady = true;
    if (this.settingsChanged) {
      this.updateAndRender();
    }
  }

  private updateAndRender() {
    this.updateGroupedData();
    this.cdr.detectChanges(); // Ensure templates render before component injection
    this.creatingComponentsByType();
    this.settingsChanged = false;
  }

  updateGroupedData() {
    if (!this.settings) return;

    this.groupedMap.clear();
    this.settings.forEach((element) => {
      const { group } = element;
      if (!this.groupedMap.has(group)) {
        this.groupedMap.set(group, []);
      }
      this.groupedMap.get(group)!.push(element);
    });

    this.groupedArrayData = Array.from(this.groupedMap.entries()).map(
      ([name, group]) => ({ name, group })
    );

    this.updateExpanderStates();
  }

  updateExpanderStates() {
    const updated: Record<string, boolean> = {};
    for (const groupName of this.groupedMap.keys()) {
      updated[groupName] = this.expanderStates[groupName] ?? false;
    }
    this.expanderStates = updated;
  }

  creatingComponentsByType() {
    if (!this.settings || !this.settings.length) return;

    const entries = Array.from(this.groupedMap.entries());
    entries.forEach(([_, items], index) => {
      const container = this.viewContainers.get(index);
      if (!container) return;

      container.clear();

      items.forEach((element) => {
        if (!this.checkPermission(element)) return;

        const component = this.getComponentByType(element.type);
        if (!component) return;

        const control = new FormControl(element.value ?? null);
        if (!this.form.contains(element.key)) {
          this.form.addControl(element.key, control);
        }

        const ref = container.createComponent(component);
        this.setInputs(ref, element, control);
      });
     
    });
  }

  setInputs(ref: ComponentRef<any>, element: Setting, control: FormControl) {
    ref.setInput('control', control);
    ref.setInput('key', element.key);
    ref.setInput('label', element.label);
    if (element.metadata && 'options' in element.metadata) {
      ref.setInput('options', element.metadata.options || []);
    }
  }

  toggleExpander(groupName: string): void {
    this.expanderStates[groupName] = !this.expanderStates[groupName];
  }

  getComponentByType(type: SettingType): Type<any> | null {
    return COMPONENT_MAP[type];
  }

  checkPermission(element: Setting) {
    return element.roles.includes(this.role);
  }

  getSetting() {
    this.requestSettings.emit();
  }

  setSettings() {
    this.saveSettings.emit();
  }
}
