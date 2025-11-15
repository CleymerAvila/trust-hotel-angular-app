import { JwtPayload } from "jwt-decode";

export interface CustomPayload extends JwtPayload {
  exp: number;
  iss: string;
  role: string;
  sub: string;
  user: string;
}
