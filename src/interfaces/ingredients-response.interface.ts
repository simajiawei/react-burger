import { IngredientInterface } from './ingredient.interface';

export interface IngrediendsResponseInterface {
  data: IngredientInterface[];
  success: boolean;
}
