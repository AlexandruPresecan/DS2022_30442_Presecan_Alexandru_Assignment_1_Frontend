import { Role } from "../../enums/role";

export interface User {
  id?: number;
  userName: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  newPassword?: string;
  role?: Role;
}
