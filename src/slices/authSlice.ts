"use client";
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {loginUser, fetchUserProfile} from "../services/api";

interface User{
  id: number;
  username: string;
}

interface AuthState{
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;  
}

const initialState : AuthState = {
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") || null : null,
  isAuthenticated: typeof window !== "undefined" ? !!localStorage.getItem("token") : false,
  loading: false,
  error: null,
}

//Async Thunk for login
export const login = createAsyncThunk(
  "auth/login", 
  async ({username, password} : {username:string, password:string}, {rejectWithValue}) => {
    try{
      const data  = await loginUser(username, password);
      localStorage.setItem("token", data.token);
      return data;
    }
    catch(error : any){
      return rejectWithValue(error.response?.data?.message || "login failed!");
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, {rejectWithValue, getState}) => {
    try{
      const state = getState() as {auth: AuthState};
      if(!state.auth.token) throw new Error("No token available!");
      const userdata = await fetchUserProfile(state.auth.token);
      return userdata;
    }
    catch(error : any){
      return rejectWithValue(error.response?.data?.message || "fetch profile failed!")
    }
  }
)

const authSlice = createSlice({
  name : "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(login.fulfilled, (state, action: PayloadAction<{token: string, user:User}>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
    })
    .addCase(login.rejected, (state, action:PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    })
  }
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;