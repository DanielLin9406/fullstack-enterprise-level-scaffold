import { login } from "./login";

export interface IUserOperators {
  login(username: string, password: string): void;
}

export default { login };
