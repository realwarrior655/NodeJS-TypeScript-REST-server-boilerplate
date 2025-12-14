export interface IUser {
  name: string;
  email: string;
  password?: string;
  img?: string;
  rol: "ADMIN_ROLE" | "USER_ROLE";
  estado: boolean;
  google?: boolean;
}
