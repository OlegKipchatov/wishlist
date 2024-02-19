import { createSlice } from "@reduxjs/toolkit";

const initialState: AddItemPopupSliceState = {
  show: false,
};

export const addItemPopupSlice = createSlice({
  name: "editCard",
  initialState,
  reducers: {
    show: (state) => {
      state.show = true;
    },
    hide: (state) => {
        state.show = false;
    },
  },
});

export type AddItemPopupSliceState = {
  show: boolean,
};
