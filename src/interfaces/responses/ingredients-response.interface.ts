import { IngredientResponseInterface } from '../models/ingredient.interface';
import { BaseResponseInterface } from './base-response.interface';

export interface IngrediendsResponseInterface extends BaseResponseInterface {
  data: IngredientResponseInterface[];
}
