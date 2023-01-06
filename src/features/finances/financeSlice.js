import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import financeService from "./financeService";

const initialState = {
  finances: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createFinance = createAsyncThunk(
  "finance/create",
  async (financeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await financeService.createFinance(financeData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getFinances = createAsyncThunk(
  "finances/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await financeService.getFinances(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFinance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFinance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.finances.push(action.payload);
      })
      .addCase(createFinance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFinances.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFinances.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.finances = action.payload;
      })
      .addCase(getFinances.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = financeSlice.actions;
export default financeSlice.reducer;
