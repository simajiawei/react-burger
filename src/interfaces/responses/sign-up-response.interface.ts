import { BaseResponseInterface } from './base-response.interface';
import { UserInterface } from '../models/user.interface';

export interface SignUpResponseInterface extends BaseResponseInterface {
  user: UserInterface;
  accessToken: string;
  refreshToken: string;
}
