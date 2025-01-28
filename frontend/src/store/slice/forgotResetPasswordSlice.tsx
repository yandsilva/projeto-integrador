import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "axios";

interface forgotResetPassSliceProps {
  loading: boolean;
  error: string | null;
  message: string | null;
}

interface forgotResetProps {
  email: string;
}

const initialState: forgotResetPassSliceProps = {
  loading: false,
  error: null,
  message: null,
};

const forgotResetPassSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    forgotPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    forgotPasswordFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const forgotPassword =
  ({ email }: forgotResetProps) =>
  async (dispatch: AppDispatch) => {
    dispatch(forgotResetPassSlice.actions.forgotPasswordRequest());
    try {
      const { data } = await axios.post(
        "https://api.example.com/forgot/password",
        { email },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(
        forgotResetPassSlice.actions.forgotPasswordSuccess(data.message)
      );
      dispatch(forgotResetPassSlice.actions.clearAllErrors());
    } catch (error: any) {
      dispatch(
        forgotResetPassSlice.actions.forgotPasswordFailed(
          error.response?.data?.message || "An error occurrend"
        )
      );
    }
  };

export const clearAllForgotPasswordErrors = () => (dispatch: AppDispatch) => {
  dispatch(forgotResetPassSlice.actions.clearAllErrors());
};

export default forgotResetPassSlice.reducer;
