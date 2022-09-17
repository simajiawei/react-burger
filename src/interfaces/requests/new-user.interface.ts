import { UserInterface } from '../models/user.interface';

export interface NewUserInterface extends UserInterface {
  password: string;
}
