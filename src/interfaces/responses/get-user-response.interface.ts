import { BaseResponseInterface } from './base-response.interface';
import { UserInterface } from '../models/user.interface';

export interface GetUserResponseInterface extends BaseResponseInterface {
  user: UserInterface;
}
