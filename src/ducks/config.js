import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiRequest from 'src/api/ApiRequest';

const initialState = {
  termsOfService: null,
};

const SLICE_NAME = `config`;

export const loadTermOfServiceBlockMap = createAsyncThunk(
  `${SLICE_NAME}/loadTermOfServiceBlockMap`,
  async () => {
    const response = await ApiRequest.loadNotionPageData("da2ccf757c0f40b9a6c8087eb39e77fa");
    return response.data;
  }
);

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTermOfServiceBlockMap.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadTermOfServiceBlockMap.fulfilled, (state, action) => {
        state.termsOfService = action.payload;
      });
  },
});


export default configSlice.reducer;
