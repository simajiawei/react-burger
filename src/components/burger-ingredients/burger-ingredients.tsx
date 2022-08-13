import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { CategoryKey } from '../../enums/category-key.enum';
import { IngredientInterface } from '../../interfaces/ingredient.interface';
import { Ingredient } from './ingredient/ingredient';
import styles from './burger-ingredients.module.css';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';

interface BurgerIngredientsProps {
  ingredients: IngredientInterface[];
}

export function BurgerIngredients(props: BurgerIngredientsProps) {
  const [selectedCategory, setSelectedCategory] = useState(CategoryKey.BUN);
  const [selectedIngredient, setSelectedIngredient]: [IngredientInterface | undefined, any] = useState();
  const categories: { [key: string]: string } = {
    [CategoryKey.BUN]: 'Булки',
    [CategoryKey.SAUCE]: 'Соусы',
    [CategoryKey.MAIN]: 'Начинки'
  };

  const handleTabClick = (category: string) => {
    setSelectedCategory(category as CategoryKey);
  };

  const onCloseDetails = (e: SyntheticEvent) => {
    setSelectedIngredient();
  };

  const onCardClick = (ingredient: IngredientInterface) => {
    setSelectedIngredient(ingredient);
  };

  const gridClassName = `${styles.cardsGrid} pl-2 pr-2 pt-6`;
  return (
    <>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div style={{ display: 'flex' }}>
        {Object.keys(categories).map((category) => {
          return (
            <Tab
              key={category}
              value={category}
              onClick={handleTabClick}
              active={category === selectedCategory}>
              {categories[category]}
            </Tab>
          );
        })}
      </div>
      <div className={styles.ingredientsByCategories}>
        {Object.keys(categories).map((category) => {
          return (
            <section
              key={category}
              className="mt-10 mb-6">
              <h2 className="text text_type_main-medium">{categories[category]}</h2>
              <div className={gridClassName}>
                {props.ingredients
                  .filter((ingredient) => ingredient.type === category)
                  .map((ingredient) => (
                    <div
                      key={ingredient._id}
                      onClick={(e) => onCardClick(ingredient)}>
                      <Ingredient {...ingredient} />
                    </div>
                  ))}
              </div>
            </section>
          );
        })}
      </div>
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
