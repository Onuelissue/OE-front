import { configureStore } from '@reduxjs/toolkit';
import config from '../ducks/config';

export const store = configureStore({
  reducer: {
    config,
  },
});
