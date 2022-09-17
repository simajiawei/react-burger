import React, { LegacyRef, SyntheticEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { CategoryKey } from '../../enums/category-key.enum';
import { IngredientInterface } from '../../interfaces/models/ingredient.interface';
import styles from './burger-ingredients.module.css';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';
import { IngredientsCards } from './ingredients-cards/ingredients-cards';
import { useSelector } from 'react-redux';
import { DESELECT_INGREDIENT, SELECT_INGREDIENT } from '../../services/actions/burger.actions';
import { SelectIngredientActionInterface } from '../../services/actions/burger.actions.interface';
import { useInView } from 'react-intersection-observer';
import { useAppDispatch } from '../../utils/hooks';
import { StoreInterface } from '../../services/store.interface';

export interface CategoryInterface {
  [key: string]: {
    name: string;
    ref: LegacyRef<HTMLHeadingElement>;
    itemsRef: LegacyRef<HTMLElement>;
  };
}

export function BurgerIngredients() {
  const dispatch = useAppDispatch();
  const { ingredients, selectedIngredient } = useSelector((store: StoreInterface) => store.burger);
  const [selectedCategory, setSelectedCategory] = useState(CategoryKey.BUN);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });
  const [sauceRef, inViewSauce] = useInView({
    threshold: 0
  });
  const [mainRef, inViewMain] = useInView({
    threshold: 0
  });

  const categories: CategoryInterface = {
    [CategoryKey.BUN]: {
      name: 'Булки',
      ref: useRef<HTMLHeadingElement>(null),
      itemsRef: bunsRef
    },
    [CategoryKey.SAUCE]: {
      name: 'Соусы',
      ref: useRef<HTMLHeadingElement>(null),
      itemsRef: sauceRef
    },
    [CategoryKey.MAIN]: {
      name: 'Начинки',
      ref: useRef<HTMLHeadingElement>(null),
      itemsRef: mainRef
    }
  };

  useEffect(() => {
    if (inViewBuns) {
      setSelectedCategory(CategoryKey.BUN);
    } else if (inViewSauce) {
      setSelectedCategory(CategoryKey.SAUCE);
    } else if (inViewMain) {
      setSelectedCategory(CategoryKey.MAIN);
    }
  }, [inViewMain, inViewBuns, inViewSauce]);

  const handleTabClick = (category: string) => {
    // @ts-ignore
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
      <div className={styles.tabs}>
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
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
}
