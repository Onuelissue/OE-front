import { combineReducers } from '@reduxjs/toolkit';
import config from './config';

export const rootReducer = combineReducers({
  config,
});

export type RootState = ReturnType<typeof rootReducer>;