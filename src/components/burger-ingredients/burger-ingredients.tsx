import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { CategoryKey } from '../../enums/category-key.enum';
import { IngredientInterface } from '../../interfaces/ingredient.interface';
import { Ingredient } from './ingredient/ingredient';
import styles from './burger-ingredients.module.css';

interface State {
  category: CategoryKey;
}

export class BurgerIngredients extends React.Component<{ ingredients: IngredientInterface[] }> {
  readonly categories: { [key: string]: string } = {
    [CategoryKey.BUN]: 'Булки',
    [CategoryKey.SAUCE]: 'Соусы',
    [CategoryKey.MAIN]: 'Начинки'
  };

  state: State = {
    category: CategoryKey.BUN
  };

  setCategory = (category: string): void => {
    this.setState({
      ...this.state,
      category
    });
  };

  render() {
    const gridClassName = `${styles.cardsGrid} pl-2 pr-2 pt-6`;
    return (
      <>
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
        <div style={{ display: 'flex' }}>
          {Object.keys(this.categories).map((category) => {
            return (
              <Tab
                key={category}
                value={category}
                active={this.state.category === category}
                onClick={this.setCategory}>
                {this.categories[category]}
              </Tab>
            );
          })}
        </div>
        <div className={styles.ingredientsByCategories}>
          {Object.keys(this.categories).map((category) => {
            return (
              <section
                key={category}
                className="mt-10 mb-6">
                <h2 className="text text_type_main-medium">{this.categories[category]}</h2>
                <div className={gridClassName}>
                  {this.props.ingredients
                    .filter((ingredient) => ingredient.type === category)
                    .map((ingredient) => (
                      <Ingredient
                        key={ingredient._id}
                        {...ingredient}
                      />
                    ))}
                </div>
              </section>
            );
          })}
        </div>
      </>
    );
  }
}
