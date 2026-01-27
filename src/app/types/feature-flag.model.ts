export interface IFeatureFlag {
  _id: string;
  key: string;
  enabled: boolean;
  value: boolean | number | string;
  description?: string;
  allowedRoles: string[];
  createdAt: string;
}