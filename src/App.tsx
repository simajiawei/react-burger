import React from 'react';
import './App.css';
import { AppHeader } from './components/app-header/app-header';
import { BurgerIngredients } from './components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from './components/burger-constructor/burger-constructor';
import jsonData from "./utils/data.json";
import {IngredientInterface} from "./interfaces/ingredient.interface";

interface State{
  ingredients: IngredientInterface[]
}

class App extends React.Component {

  state: State = {
    ingredients: []
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      ingredients: jsonData as IngredientInterface[]
    })
  }

  render(){
    return (
      <>
        <AppHeader />
        <main>
          <div className='mainWrapper'>
            <div>
              <BurgerIngredients ingredients={this.state.ingredients} />
            </div>
            <div className='pl-4 pr-4 pt-25'>
              <BurgerConstructor ingredients={this.state.ingredients} />
            </div>
          </div>
        </main>
      </>
    );
  }

}


export default App;
