import {createSlice} from '@reduxjs/toolkit';
import {Task} from '~types';

const initialState: {[key: string]: Task} = {
  '1': {
    id: '1',
    title: 'Task 1',
    deadline: '27/12/2024',
    completed: false,
    priority: 'high',
  },
  '2': {
    id: '2',
    title: 'Task 2',
    deadline: '24/12/2024',
    completed: false,
    priority: 'medium',
  },
  '3': {
    id: '3',
    title: 'Task 3',
    deadline: '15/12/2024',
    completed: false,
    priority: 'low',
  },
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    addTask: (state, action) => {
      state[action.payload.id] = action.payload;
    },
    removeTask: (state, action) => {
      delete state[action.payload];
    },
    updateTask: (state, action) => {
      state[action.payload.id] = action.payload;
    },
  },
});

export const {addTask, removeTask} = taskSlice.actions;

export default taskSlice.reducer;
