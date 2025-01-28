import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  [key: string]: unknown;
}

interface UserState {
  loading: boolean;
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  message: string | null;
  isUpdated: boolean;
}

interface CreateUserProps {
  name: string;
  email: string;
  password: string;
}

interface LoginProps {
  email: string;
  password: string;
}

const initialState: UserState = {
  loading: false,
  user: null,
  isAuthenticated: false,
  error: null,
  message: null,
  isUpdated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUserRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    createUserSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.message = "User created successfully!";
      state.error = null;
    },
    createUserFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload;
      state.message = null;
    },

    loginRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },

    logoutSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.message = action.payload;
    },
    logoutFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },

    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const createUser =
  ({ name, email, password }: CreateUserProps) =>
  async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.createUserRequest());
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        { name, email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(userSlice.actions.createUserSuccess(data.user));
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error: any) {
      dispatch(
        userSlice.actions.createUserFailed(
          error.response.data.message ||
            "An error occurred during user creation."
        )
      );
    }
  };

export const login =
  ({ email, password }: LoginProps) =>
  async (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.loginRequest());
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(userSlice.actions.loginSuccess(data.user));
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error: any) {
      dispatch(
        userSlice.actions.loginFailed(
          error.response?.data?.message || "An error occurrend"
        )
      );
    }
  };

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/user/logout",
      {
        withCredentials: true,
      }
    );
    const message = data.message || "Logout successful.";
    dispatch(userSlice.actions.logoutSuccess(message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error: any) {
    dispatch(
      userSlice.actions.logoutFailed(
        error.response?.data?.message || "An error occurred during logout."
      )
    );
  }
};

export const clearAllUserErrors = () => (dispatch: AppDispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;
