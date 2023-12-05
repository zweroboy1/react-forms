import { combineReducers, configureStore } from '@reduxjs/toolkit';
import countriesReducer from './slices/countriesSlice';
import cardReducer from './slices/cardSlice';

const rootReducer = combineReducers({
  countries: countriesReducer,
  cards: cardReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
