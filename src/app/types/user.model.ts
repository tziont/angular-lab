import { Role } from "./roles.model";
export interface User {
  id: number;
  username: string;
  role: Role;
}