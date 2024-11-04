// tasksSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await fetch('https://671891927fc4c5ff8f49fcac.mockapi.io/test');
  return response.json();
});

export const createTask = createAsyncThunk('tasks/createTask', async (task) => {
  const response = await fetch('https://671891927fc4c5ff8f49fcac.mockapi.io/test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  return response.json();
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task) => {
  const response = await fetch(`https://671891927fc4c5ff8f49fcac.mockapi.io/test/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  return response.json();
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
  await fetch(`https://671891927fc4c5ff8f49fcac.mockapi.io/test/${taskId}`, {
    method: 'DELETE',
  });
  return taskId;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.data.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.data = state.data.filter(task => task.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;