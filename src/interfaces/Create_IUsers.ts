export interface Create_User {
  name: string;
  email: string;
  password?: string;
  img?: string;
  rol: "ADMIN_ROLE" | "USER_ROLE";
  id: string;
  estado: boolean;
  google?: boolean;
}
