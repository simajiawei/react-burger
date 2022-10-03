import { BurgerStateInterface } from './reducers/burger.state.interface';
import { AuthStateInterface } from './reducers/auth.state.interface';

export interface StoreInterface {
  burger: BurgerStateInterface;
  auth: AuthStateInterface;
}
