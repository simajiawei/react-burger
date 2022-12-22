import { burgerReducer } from './burger.reducer';
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
  it('should return initial state', () => {
    expect(burgerReducer(undefined, {})).toEqual({
      ingredients: [],
      constructorIngredients: [],
      selectedIngredient: null,
      order: null,
      orderIsProcessing: false
    });
  });

  it('should handle SET_NEW_ORDER', () => {
    expect(
      burgerReducer(undefined, {
        type: SET_NEW_ORDER,
        isProcessing: true
      })
    ).toEqual({
      ingredients: [],
      constructorIngredients: [],
      selectedIngredient: null,
      order: null,
      orderIsProcessing: true
    });
  });

  it('should handle SET_NEW_ORDER_SUCCESS', () => {
    expect(
      burgerReducer(undefined, {
        type: SET_NEW_ORDER_SUCCESS,
        orderNumber: 5
      })
    ).toEqual({
      ingredients: [],
      constructorIngredients: [],
      selectedIngredient: null,
      order: 5,
      orderIsProcessing: false
    });
  });

  it('should handle ADD_INGREDIENT_TO_CONSTRUCTOR', () => {
    expect(
      burgerReducer(
        {
          ingredients: [
            {
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
            }
          ],
          constructorIngredients: [],
          selectedIngredient: null,
          order: 5,
          orderIsProcessing: false
        },
        {
          type: ADD_INGREDIENT_TO_CONSTRUCTOR,
          constructorId: '1',
          id: '1'
        }
      )
    ).toEqual({
      ingredients: [
        {
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
          count: 1
        }
      ],
      constructorIngredients: [
        {
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
          constructorId: '1',
          count: 0
        }
      ],
      selectedIngredient: null,
      order: 5,
      orderIsProcessing: false
    });
  });

  it('should handle REMOVE_INGREDIENT_FROM_CONSTRUCTOR', () => {
    expect(
      burgerReducer(
        {
          ingredients: [
            {
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
              count: 1
            }
          ],
          constructorIngredients: [
            {
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
              constructorId: '1',
              count: 0
            }
          ],
          selectedIngredient: null,
          order: 5,
          orderIsProcessing: false
        },
        {
          type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
          constructorId: '1',
          id: '1'
        }
      )
    ).toEqual({
      ingredients: [
        {
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
        }
      ],
      constructorIngredients: [],
      selectedIngredient: null,
      order: 5,
      orderIsProcessing: false
    });
  });
  it('should handle UPDATE_INGREDIENTS', () => {
    expect(
      burgerReducer(
        {
          ingredients: [
            {
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
              count: 8
            },
            {
              _id: '2',
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
              count: 4
            }
          ],
          constructorIngredients: [],
          selectedIngredient: null,
          order: null,
          orderIsProcessing: false
        },
        {
          type: UPDATE_INGREDIENTS,
          items: [
            {
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
              __v: 0
            },
            {
              _id: '2',
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
              __v: 0
            }
          ]
        }
      )
    ).toEqual({
      ingredients: [
        {
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
        },
        {
          _id: '2',
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
        }
      ],
      constructorIngredients: [],
      selectedIngredient: null,
      order: null,
      orderIsProcessing: false
    });
  });

  it('should handle UPDATE_CONSTRUCTOR_ELEMENTS', () => {
    expect(
      burgerReducer(
        {
          ingredients: [
            {
              _id: '1',
              name: 'Флюоресцентная булка R2-D3',
              type: 'bun',
              proteins: 44,
              fat: 26,
              carbohydrates: 85,
              calories: 643,
              price: 988,
              image: 'https://code.s3.yandex.net/react/code/bun-01.png',
              image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
              image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
              __v: 0,
              count: 8
            },
            {
              _id: '2',
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
              count: 4
            },
            {
              _id: '3',
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
              count: 4
            }
          ],
          constructorIngredients: [
            {
              _id: '1',
              name: 'Флюоресцентная булка R2-D3',
              type: 'bun',
              proteins: 44,
              fat: 26,
              carbohydrates: 85,
              calories: 643,
              price: 988,
              image: 'https://code.s3.yandex.net/react/code/bun-01.png',
              image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
              image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
              __v: 0,
              count: 8
            },
            {
              _id: '2',
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
              count: 4
            },
            {
              _id: '3',
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
              count: 4
            }
          ],
          selectedIngredient: null,
          order: null,
          orderIsProcessing: false
        },
        {
          type: UPDATE_CONSTRUCTOR_ELEMENTS,
          items: [
            {
              _id: '3',
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
              count: 8
            },
            {
              _id: '2',
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
              count: 4
            }
          ]
        }
      )
    ).toEqual({
      ingredients: [
        {
          _id: '1',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          __v: 0,
          count: 8
        },
        {
          _id: '2',
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
          count: 4
        },
        {
          _id: '3',
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
          count: 4
        }
      ],
      constructorIngredients: [
        {
          _id: '1',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          __v: 0,
          count: 8
        },
        {
          _id: '3',
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
          count: 8
        },
        {
          _id: '2',
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
          count: 4
        }
      ],
      selectedIngredient: null,
      order: null,
      orderIsProcessing: false
    });
  });

  it('should handle CLEAR_CONSTRUCTOR_ELEMENTS', () => {
    expect(
      burgerReducer(
        {
          ingredients: [
            {
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
              count: 1
            }
          ],
          constructorIngredients: [
            {
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
              constructorId: '1',
              count: 0
            }
          ],
          selectedIngredient: null,
          order: 5,
          orderIsProcessing: false
        },
        {
          type: CLEAR_CONSTRUCTOR_ELEMENTS
        }
      )
    ).toEqual({
      ingredients: [
        {
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
          count: 1
        }
      ],
      constructorIngredients: [],
      selectedIngredient: null,
      order: 5,
      orderIsProcessing: false
    });
  });
});
