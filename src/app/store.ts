import { configureStore } from '@reduxjs/toolkit';
import config from 'src/ducks/config';

export const store = configureStore({
  reducer: {
    config,
  },
});
