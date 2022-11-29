import React, { FC, LegacyRef, useEffect, useMemo, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { CategoryKey } from '../../enums/category-key.enum';
import styles from './burger-ingredients.module.css';
import { IngredientsCards } from './ingredients-cards/ingredients-cards';
import { useInView } from 'react-intersection-observer';
import { useSelector } from '../../utils/hooks';

export interface CategoryInterface {
  [key: string]: {
    name: string;
    ref: LegacyRef<HTMLHeadingElement>;
    itemsRef: LegacyRef<HTMLElement>;
  };
}

export const BurgerIngredients: FC = () => {
  const { ingredients, selectedIngredient } = useSelector((store) => store.burger);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>(CategoryKey.BUN);

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

  const ingrediendsCards = useMemo(
    () => (
      <IngredientsCards
        categories={categories}
        ingredients={ingredients}
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
    </>
  );
};
