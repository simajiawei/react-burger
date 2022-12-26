import { burgerReducer, initialState } from './burger.reducer';
import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR_ELEMENTS,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  SET_NEW_ORDER,
  SET_NEW_ORDER_SUCCESS,
  UPDATE_CONSTRUCTOR_ELEMENTS,
  UPDATE_INGREDIENTS
} from '../actions/burger.actions';

describe('burger reducer', () => {
  const newOrder = {
    ingredients: [],
    constructorIngredients: [],
    selectedIngredient: null,
    order: 5,
    orderIsProcessing: false
  };
  const sause = {
    _id: '1',
    name: 'Флюоресцентная булка R2-D3',
    type: 'sauce',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    __v: 0,
    count: 0
  };

  const sause2 = {
    ...sause,
    _id: '2'
  };

  const bun = {
    ...sause,
    _id: '3',
    type: 'bun'
  };

  const sauseOnlyBurger = {
    ...newOrder,
    ingredients: [
      {
        ...sause,
        count: 1
      }
    ],
    constructorIngredients: [
      {
        ...sause,
        constructorId: '1'
      }
    ]
  };

  const bunBurger = {
    ...newOrder,
    ingredients: [
      {
        ...sause,
        count: 8
      },
      {
        ...sause2,
        count: 4
      },
      {
        ...bun,
        count: 4
      }
    ],
    constructorIngredients: [bun, sause, sause2]
  };

  it('should return initial state', () => {
    expect(burgerReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_NEW_ORDER', () => {
    expect(
      burgerReducer(undefined, {
        type: SET_NEW_ORDER,
        isProcessing: true
      })
    ).toEqual({
      ...newOrder,
      orderIsProcessing: true,
      order: null
    });
  });

  it('should handle SET_NEW_ORDER_SUCCESS', () => {
    expect(
      burgerReducer(undefined, {
        type: SET_NEW_ORDER_SUCCESS,
        orderNumber: 5
      })
    ).toEqual(newOrder);
  });

  it('should handle ADD_INGREDIENT_TO_CONSTRUCTOR', () => {
    expect(
      burgerReducer(
        {
          ...newOrder,
          ingredients: [sause]
        },
        {
          type: ADD_INGREDIENT_TO_CONSTRUCTOR,
          constructorId: '1',
          id: '1'
        }
      )
    ).toEqual(sauseOnlyBurger);
  });

  it('should handle REMOVE_INGREDIENT_FROM_CONSTRUCTOR', () => {
    expect(
      burgerReducer(sauseOnlyBurger, {
        type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
        constructorId: '1',
        id: '1'
      })
    ).toEqual({
      ...newOrder,
      ingredients: [sause]
    });
  });
  it('should handle UPDATE_INGREDIENTS', () => {
    expect(
      burgerReducer(
        {
          ...newOrder,
          ingredients: [
            {
              ...sause,
              count: 8
            },
            {
              ...sause2,
              count: 4
            }
          ]
        },
        {
          type: UPDATE_INGREDIENTS,
          items: [sause, sause2]
        }
      )
    ).toEqual({
      ...newOrder,
      ingredients: [
        {
          ...sause,
          count: 0
        },
        {
          ...sause2,
          count: 0
        }
      ]
    });
  });

  it('should handle UPDATE_CONSTRUCTOR_ELEMENTS', () => {
    expect(
      burgerReducer(bunBurger, {
        type: UPDATE_CONSTRUCTOR_ELEMENTS,
        items: [sause2, sause]
      })
    ).toEqual({
      ...bunBurger,
      constructorIngredients: [bun, sause2, sause]
    });
  });

  it('should handle CLEAR_CONSTRUCTOR_ELEMENTS', () => {
    expect(
      burgerReducer(sauseOnlyBurger, {
        type: CLEAR_CONSTRUCTOR_ELEMENTS
      })
    ).toEqual({
      ...sauseOnlyBurger,
      constructorIngredients: []
    });
  });
});
