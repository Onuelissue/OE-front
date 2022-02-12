import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import ApiRequest from 'src/api/ApiRequest';

const initialState = {
  termsOfService: null,
};

const SLICE_NAME = `config`;

export const loadTermOfServiceBlockMap = createAsyncThunk(
  `${SLICE_NAME}/loadTermOfServiceBlockMap`,
  async () => {
    return '';
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
