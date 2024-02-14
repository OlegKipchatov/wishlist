/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/* Instruments */
// import { incrementAsync } from "./thunks";

const initialState: PopupSliceState = {
  show: false,
};

export const popupSlice = createSlice({
  name: "popup",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    showPopup: (state, action: PayloadAction<boolean>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.show = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, (state) => {
  //       state.status = "loading";
  //     })
  //     .addCase(incrementAsync.fulfilled, (state, action) => {
  //       state.status = "idle";
  //       state.value += action.payload;
  //     });
  // },
});

/* Types */
export interface PopupSliceState {
  show: boolean;
}
