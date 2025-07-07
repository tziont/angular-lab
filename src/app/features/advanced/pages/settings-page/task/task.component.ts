import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  ElementRef,
  QueryList,
  ViewContainerRef,
  OnChanges,
  AfterViewInit,
  SimpleChanges,
  Type,
  ChangeDetectorRef,
  ComponentRef,
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
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements AfterViewInit, OnChanges {
  @Input() settings: Settings | undefined;
  @Input() form!: FormGroup;
  @Input() role!: Role;
  @Output() click = new EventEmitter<void>();
  @Output() saveSettings = new EventEmitter<void>();

  @ViewChildren('groupHost', { read: ViewContainerRef })
  viewContainers!: QueryList<ViewContainerRef>;

  expanderStates: Record<string, boolean> = {};
  groupedMap = new Map<string, Setting[]>();
  settingsChanged = false;
  viewReady = false;
  groupedArrayData: Array<{ name: string; group: Setting[] }> = [];

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

  // New method to update grouped data, detect changes, then create components:
  private updateAndRender() {
    this.updateGroupedData(); // Step 1: update grouped data array
    this.cdr.detectChanges(); // Step 2: let Angular render ng-templates
    this.creatingComponentsByType(); // Step 3: create dynamic components inside containers
    this.settingsChanged = false;
  }

  getSetting() {
    this.click.emit();
  }

  setSettings() {
    this.saveSettings.emit();
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
      ([name, group]) => ({
        name,
        group,
      })
    );

    this.expanderStates = {};
    for (const groupName of this.groupedMap.keys()) {
      this.expanderStates[groupName] = false;
    }
  }

  creatingComponentsByType() {
    if (!this.settings || !this.settings.length) return;

    const entries = Array.from(this.groupedMap.entries());
    entries.forEach(([groupName, items], index) => {
      const container = this.viewContainers.get(index);
      if (!container) return;

      container.clear(); // clear old components before adding new ones

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
}
