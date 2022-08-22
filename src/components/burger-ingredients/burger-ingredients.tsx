import React, { SyntheticEvent, useContext, useEffect, useMemo, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { CategoryKey } from '../../enums/category-key.enum';
import { IngredientInterface } from '../../interfaces/ingredient.interface';
import styles from './burger-ingredients.module.css';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';
import { BurgerContext } from '../../services/burger-context';
import { IngredientsCards } from './ingredients-cards/ingredients-cards';

const categories: { [key: string]: string } = {
  [CategoryKey.BUN]: 'Булки',
  [CategoryKey.SAUCE]: 'Соусы',
  [CategoryKey.MAIN]: 'Начинки'
};

export function BurgerIngredients() {
  const ingredients = useContext(BurgerContext);

  const [selectedCategory, setSelectedCategory] = useState(CategoryKey.BUN);
  const [selectedIngredient, setSelectedIngredient]: [IngredientInterface | undefined, any] = useState();

  const handleTabClick = (category: string) => {
    setSelectedCategory(category as CategoryKey);
  };

  const onCloseDetails = (e: SyntheticEvent) => {
    setSelectedIngredient();
  };

  const onCardClick = (ingredient: IngredientInterface) => {
    setSelectedIngredient(ingredient);
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
            {categories[category]}
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
