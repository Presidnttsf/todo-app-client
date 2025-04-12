import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchTasks,
  addTask,
  updateTask,
  deleteTask,
} from '../../services/taskService';

const initialState = {
  tasks: [],
  status: 'idle',
  error: null,
  currentPage: 1,
  totalPages: 1,
  filters: {
    search: '',
    status: '',
    date: '',
  },
};

export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async ({ page = 1, filters = {} }, { rejectWithValue }) => {
    try {
      const response = await fetchTasks(page, filters);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await addTask(taskData);
      await dispatch(fetchUser());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editTask = createAsyncThunk(
  'tasks/editTask',
  async ({ id, taskData }, { rejectWithValue }) => {
    try {
      const response = await updateTask(id, taskData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeTask = createAsyncThunk(
  'tasks/removeTask',
  async (id, { rejectWithValue }) => {
    try {
      await deleteTask(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload.tasks;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
  },
});

export const { setFilters, setPage } = tasksSlice.actions;
export default tasksSlice.reducer;