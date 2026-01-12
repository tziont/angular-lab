export interface IFeatureFlag {
    key: string;
    value: boolean;
    description?: string;
    roles: string[];
}