import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import logReducer from '../features/logSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    log: logReducer
  },
});
