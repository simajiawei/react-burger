import { BurgerStateInterface } from './reducers/burger.state.interface';
import { AuthStateInterface } from './reducers/auth.state.interface';
import { WsStateInterface } from './reducers/ws.state.interface';

export interface StoreInterface {
  burger: BurgerStateInterface;
  auth: AuthStateInterface;
  wsFeed: WsStateInterface;
  wsHistory: WsStateInterface;
}
