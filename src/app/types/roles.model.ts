export const ROLES = ['admin', 'user', 'editor'] as const;

export type Role = typeof ROLES[number];