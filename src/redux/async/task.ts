import {createAsyncThunk} from '@reduxjs/toolkit';
import {Task} from '~types';

export const syncTaskFromAsyncStorage = createAsyncThunk(
  'tasks/syncTaskFromAsyncStorage',
  async () => {
    // Some async operation
    return {} as {[key: string]: Task};
  },
);
