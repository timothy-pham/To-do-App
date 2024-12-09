import {createSlice} from '@reduxjs/toolkit';
import {storeData} from '~libs/async/storage';
import {Task} from '~types';

const initialState: {[key: string]: Task} = {};

const taskSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    syncTasks: (state, action: {payload: {[key: string]: Task}}) => {
      return action.payload;
    },
    addTask: (state, action: {payload: Task}) => {
      state[action.payload.id] = action.payload;
      storeData('tasks', state);
    },
    removeTask: (state, action: {payload: string}) => {
      delete state[action.payload];
      storeData('tasks', state);
    },
    updateTask: (state, action: {payload: Task}) => {
      state[action.payload.id] = action.payload;
      storeData('tasks', state);
    },
  },
});

export const {syncTasks, addTask, updateTask, removeTask} = taskSlice.actions;

export default taskSlice.reducer;
