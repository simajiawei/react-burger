import { UserInterface } from '../../interfaces/models/user.interface';

export interface AuthStateInterface {
  user: UserInterface | null;
  accessToken: string | null;
  refreshToken: string | null;
}
