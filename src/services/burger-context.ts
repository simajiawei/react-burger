import { createContext } from 'react';
import { IngredientInterface } from '../interfaces/ingredient.interface';

export const BurgerContext = createContext<IngredientInterface[]>([]);
