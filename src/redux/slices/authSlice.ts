import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { removeToken } from "@/lib/utils/tokenUtils";

interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: string | null;
  permissions: string[];
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  role: null,
  permissions: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: any;
        token: string;
        role?: string;
        permissions?: string[];
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.role = action.payload.role || null;
      state.permissions = action.payload.permissions || [];
      // Don't store token in cookies - server already set HTTP-only cookie
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.role = null;
      state.permissions = [];
      removeToken();
    },
  },
});

export const { setCredentials, setLoading, logout } = authSlice.actions;
