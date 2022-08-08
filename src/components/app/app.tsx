import React from 'react';
import styles from './app.module.css';
import {AppHeader} from '../app-header/app-header';
import {BurgerIngredients} from '../burger-ingredients/burger-ingredients';
import {BurgerConstructor} from '../burger-constructor/burger-constructor';
import jsonData from "../../utils/data.json";
import {IngredientInterface} from "../../interfaces/ingredient.interface";
import {CategoryKey} from "../../enums/category-key.enum";

interface State{
  ingredients: IngredientInterface[],
  bun: IngredientInterface | undefined
}

class App extends React.Component {

  state: State = {
    ingredients: [],
    bun: undefined
  };

  componentDidMount() {
    const ingredients = jsonData as IngredientInterface[];
    const bun:IngredientInterface = ingredients.find((ingredient)=> ingredient.type === CategoryKey.BUN) as IngredientInterface
    this.setState({
      ...this.state,
      ingredients,
      bun
    })
  }

  render(){
    const constructorWrapperClassName = `${styles.constructorWrapper} pl-4 pr-4 pt-25`
    return (
      <>
        <AppHeader />
        <main>
          <div className={styles.mainWrapper}>
            <div className={styles.ingredientsWrapper}>
              <BurgerIngredients ingredients={this.state.ingredients} />
            </div>
            <div className={constructorWrapperClassName}>
              <BurgerConstructor
                bun={this.state.bun as IngredientInterface}
                ingredients={
                  this.state.ingredients
                    .filter((ingredient)=>
                      [CategoryKey.MAIN, CategoryKey.SAUCE].includes(ingredient.type))
                } />
            </div>
          </div>
        </main>
      </>
    );
  }

}


export default App;
