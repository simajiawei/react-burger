import { TypedUseSelectorHook, useDispatch, useSelector as selectorHook } from 'react-redux';
import { AppDispatch, RootState } from '../services/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
