// store.js
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';

const storeToolkit = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default storeToolkit;