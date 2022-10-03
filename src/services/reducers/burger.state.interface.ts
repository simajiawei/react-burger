import { ConstructorIngredientInterface, IngredientInterface } from '../../interfaces/models/ingredient.interface';

export interface BurgerStateInterface {
  ingredients: IngredientInterface[];
  constructorIngredients: ConstructorIngredientInterface[];
  selectedIngredient: IngredientInterface | null;
  order: number | null;
  orderIsProcessing: boolean;
}
