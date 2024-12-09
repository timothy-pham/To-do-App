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
      sortTasks(state);
      storeData('tasks', state);
    },
    removeTask: (state, action: {payload: string}) => {
      delete state[action.payload];
      storeData('tasks', state);
    },
    updateTask: (state, action: {payload: Task}) => {
      state[action.payload.id] = action.payload;
      sortTasks(state);
      storeData('tasks', state);
    },
  },
});

const sortTasks = (state: {[key: string]: Task}) => {
  const sortedEntries = Object.entries(state).sort(([, a], [, b]) => {
    // Sorting logic based on priority
    const priorityOrder = {high: 1, medium: 2, low: 3};
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  // Reconstruct the state object with sorted entries
  const sortedState = Object.fromEntries(sortedEntries);

  // Overwrite the state with the sorted version
  Object.keys(state).forEach(key => delete state[key]);
  Object.assign(state, sortedState);
};

export const {syncTasks, addTask, updateTask, removeTask} = taskSlice.actions;

export default taskSlice.reducer;
