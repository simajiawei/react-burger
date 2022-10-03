import { BaseResponseInterface } from './base-response.interface';

export interface NewOrderResponseInterface extends BaseResponseInterface {
  name: string;
  order: {
    number: number;
  };
}
