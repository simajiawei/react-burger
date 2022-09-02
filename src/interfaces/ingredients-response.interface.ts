import { IngredientResponseInterface } from './ingredient.interface';

export interface IngrediendsResponseInterface {
  data: IngredientResponseInterface[];
  success: boolean;
}
