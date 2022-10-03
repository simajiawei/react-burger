import { TokensInterface } from '../models/tokens.interface';
import { BaseResponseInterface } from './base-response.interface';

export interface RefreshTokenResponseInterface extends BaseResponseInterface, TokensInterface {}
