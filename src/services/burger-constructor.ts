import { createContext } from 'react';
import { IngredientInterface } from '../interfaces/ingredient.interface';

export const SelectedIngredientsContext = createContext<IngredientInterface[]>([]);
