import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiRequest from 'src/api/ApiRequest';
// import ApiRequest from 'src/api/ApiRequest';

const initialState = {
  termsOfService: null,
  isSubscribed: true,
};

const SLICE_NAME = `config`;

export const getUserSubribedStatus = createAsyncThunk(
  `${SLICE_NAME}/getUserSubribedStatus`,
  async (id: string) => {
    return ApiRequest.getUserSubscribed(id);
  }
);

interface updateUserSubribedStatusInput {
  subscribed: boolean,
  id: string,
}
export const updateUserSubribedStatus = createAsyncThunk(
  `${SLICE_NAME}/updateUserSubribedStatus`,
  async (input: updateUserSubribedStatusInput) => {
    const { id, subscribed } = input;
    return ApiRequest.updateUserSubribedStatus(id, subscribed);
  }
);

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserSubribedStatus.pending, (state) => {
        state.isSubscribed = true;
      })
      .addCase(getUserSubribedStatus.fulfilled, (state, action) => {
        state.isSubscribed = action.payload;
      })
      .addCase(updateUserSubribedStatus.fulfilled, (state, action) => {
        state.isSubscribed = action.payload;
      })
  },
});

export const {
} = configSlice.actions;

export default configSlice.reducer;
