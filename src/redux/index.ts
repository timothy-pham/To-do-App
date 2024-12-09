import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {setupListeners} from '@reduxjs/toolkit/query';
import {rootReducer} from './slices';

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch<AppDispatch>;

setupListeners(store.dispatch);
