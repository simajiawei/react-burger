import React, { MutableRefObject, SyntheticEvent, useMemo, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { CategoryKey } from '../../enums/category-key.enum';
import { IngredientInterface } from '../../interfaces/ingredient.interface';
import styles from './burger-ingredients.module.css';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';
import { IngredientsCards } from './ingredients-cards/ingredients-cards';
import { useDispatch, useSelector } from 'react-redux';
import { StoreInterface } from '../../services/reducers';
import { DESELECT_INGREDIENT, SELECT_INGREDIENT } from '../../services/actions';
import { SelectIngredientActionInterface } from '../../services/actions/actions.interface';

export interface CategoryInterface {
  [key: string]: {
    name: string;
    ref: MutableRefObject<HTMLElement | null>;
  };
}

export function BurgerIngredients() {
  const dispatch = useDispatch();
  const { ingredients, selectedIngredient } = useSelector((store: StoreInterface) => store.burger);
  console.log('burger ingredients: ', ingredients);
  const categories: CategoryInterface = {
    [CategoryKey.BUN]: {
      name: 'Булки',
      ref: useRef<HTMLElement>(null)
    },
    [CategoryKey.SAUCE]: {
      name: 'Соусы',
      ref: useRef<HTMLElement>(null)
    },
    [CategoryKey.MAIN]: {
      name: 'Начинки',
      ref: useRef<HTMLElement>(null)
    }
  };
  const [selectedCategory, setSelectedCategory] = useState(CategoryKey.BUN);
  // const [selectedIngredient, setSelectedIngredient]: [IngredientInterface | undefined, any] = useState();

  const handleTabClick = (category: string) => {
    (categories[category].ref.current as HTMLElement).scrollIntoView({
      behavior: 'smooth'
    });
    setSelectedCategory(category as CategoryKey);
  };

  const onCloseDetails = (e: SyntheticEvent) => {
    dispatch({
      type: DESELECT_INGREDIENT
    });
  };

  const onCardClick = (ingredient: IngredientInterface) => {
    dispatch<SelectIngredientActionInterface>({
      type: SELECT_INGREDIENT,
      item: ingredient
    });
  };

  const ingrediendsCards = useMemo(
    () => (
      <IngredientsCards
        categories={categories}
        ingredients={ingredients}
        onCardClick={onCardClick}
      />
    ),
    [ingredients]
  );

  return (
    <>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div style={{ display: 'flex' }}>
        {Object.keys(categories).map((category) => (
          <Tab
            key={category}
            value={category}
            onClick={handleTabClick}
            active={category === selectedCategory}>
            {categories[category].name}
          </Tab>
        ))}
      </div>
      <div className={styles.ingredientsByCategories}>{ingrediendsCards}</div>
      {!!selectedIngredient && (
        <Modal
          isOpen={!!selectedIngredient}
          onClose={onCloseDetails}
          title="Детали ингредиента">
          <IngredientDetails ingredient={selectedIngredient as IngredientInterface} />
        </Modal>
      )}
    </>
  );
}
