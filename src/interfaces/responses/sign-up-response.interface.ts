import { BaseResponseInterface } from './base-response.interface';
import { UserInterface } from '../models/user.interface';
import { TokensInterface } from '../models/tokens.interface';

export interface SignUpResponseInterface extends BaseResponseInterface, TokensInterface {
  user: UserInterface;
}
