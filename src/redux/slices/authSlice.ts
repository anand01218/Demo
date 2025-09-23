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
      const { user, token, role, permissions } = action.payload;

      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.role = role || user?.role || null;
      state.permissions = permissions || user?.permissions || [];
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
