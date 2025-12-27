export type Role = string;

export enum SettingType{
    Toggle = 'Toggle',
    Text = 'Text',
    Select = 'Select'
}

export type Value = string | number | boolean;

export type SelectOption = {
    label : string,
    value: string | number,
};

export type SelectOptions = SelectOption[]

export type ToggleMetadata = {
    type: 'ToggleMetadata';
    tooltip?: string;
}

export type TextMetadata = {
    type:'TextMetadata';
    required?: boolean;
    tooltip?: string;
    min?: number;
    max?: number;
    
}

export type SelectMetadata = {
    type: 'SelectMetadata';
    required?: boolean;
    tooltip?: string;
    options?: SelectOptions;
}

export interface IBaseSetting {
    id: string;
    key: string;
    label: string;
    roles:Role[];
    group: string;
    value: Value;
}

export interface IToggleSetting extends IBaseSetting{
    type: SettingType.Toggle;
    metadata?: ToggleMetadata;
}

export interface ITextSetting extends IBaseSetting{
    type: SettingType.Text;
    metadata?: TextMetadata;
}

export interface ISelectSetting extends IBaseSetting{
    type: SettingType.Select;
    metadata?: SelectMetadata;
}

export type Setting = ISelectSetting | ITextSetting | IToggleSetting;       


export type Settings = Setting[];