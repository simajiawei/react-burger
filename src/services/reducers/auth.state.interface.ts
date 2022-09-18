import { UserInterface } from '../../interfaces/models/user.interface';

export interface AuthStateInterface {
  user: UserInterface | null;
}
