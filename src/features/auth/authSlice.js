import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser, getCurrentUser } from '../../services/authService';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
  isAuthenticated: false,
};

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        console.log('Sending login request with:', credentials);
        const response = await loginUser(credentials);
        console.log('Login response:', response.data);
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        return {user, token};
      } catch (error) {
        console.error('Login error:', error.response);
        return rejectWithValue(error.response.data);
      }
});

export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await registerUser(userData);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const response = await getCurrentUser();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
          state.user = action.payload;
          state.isAuthenticated = true;
        state.status = 'succeeded';
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = 'failed';
        state.isAuthenticated = false;
        localStorage.removeItem('token');
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;