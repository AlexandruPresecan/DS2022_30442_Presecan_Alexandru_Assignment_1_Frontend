import { Role } from "../../enums/role";
import { Device } from "../device/device";

export interface UserDisplay {
  id: number;
  userName: string;
  email: string;
  role: Role;
  devices: Device[];
}
