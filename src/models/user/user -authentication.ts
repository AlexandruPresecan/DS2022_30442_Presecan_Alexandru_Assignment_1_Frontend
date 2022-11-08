import { Role } from "../../enums/role";

export interface UserAuthentication {
  id: number;
  userName: string;
  email: string;
  token: string;
  role: Role;
}
