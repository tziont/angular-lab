
import { Role } from "./roles.model";

export const KEYS = ['featuredflaged-demo', 'new-dashboard', 'beta-user'] as const;

export type FeatureKey = typeof KEYS[number] | '' | null;

export interface IFeatureFlag {
  _id: string;
  key: FeatureKey; // Use the type, not string!
  enabled: boolean;
  value?: boolean | number | string;
  description?: string;
  allowedRoles: Role[];
  createdAt: string;
}