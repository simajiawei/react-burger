import { CategoryKey } from '../enums/category-key.enum';

export interface IngredientResponseInterface {
  _id: string;
  name: string; //"Флюоресцентная булка R2-D3",
  type: CategoryKey;
  proteins: number; // 44,
  fat: number; //26,
  carbohydrates: number; //85,
  calories: number; // 643,
  price: number; //988,
  image: string; //"https://code.s3.yandex.net/react/code/bun-01.png",
  image_mobile: string; //"https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  image_large: string; //"https://code.s3.yandex.net/react/code/bun-01-large.png",
  __v: number; //0
}

export interface IngredientInterface extends IngredientResponseInterface {
  count: number;
}
export interface ConstructorIngredientInterface extends IngredientInterface {
  constructorId: string;
}
