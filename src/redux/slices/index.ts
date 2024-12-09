import {combineReducers} from '@reduxjs/toolkit';
import taskReducer from './task';
const combinedReducer = combineReducers({
  tasks: taskReducer,
});

export const rootReducer = (state: any, action: any) => {
  if (action.type === 'auth/logout') {
    console.log('RESET ALL STATE OF REDUX');
    state = undefined;
  }
  return combinedReducer(state, action);
};
