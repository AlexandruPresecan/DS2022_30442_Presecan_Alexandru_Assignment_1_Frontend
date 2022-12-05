import { Role } from "../../enums/role";
import { Device } from "../device/device";

export interface User {
  id: number;
  userName: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  newPassword?: string;
  role?: Role;
  devices?: Device[];
}
