import { Quize } from "./Quize";
import { User } from "./User";

export interface Room {
  quizes: Quize[];
  users: User[];
  isEmited: boolean;
  isFinished: boolean;
  timeout: number;
  idRoom: string;
}
