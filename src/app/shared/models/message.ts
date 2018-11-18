import { User } from "./user";

export interface Message {
  from: User,
  to: User,
  message: string,
  createdAt: Date
}
