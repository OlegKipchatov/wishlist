/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: TempState = {
  isTemp: true,
};

export const tempSlice = createSlice({
  name: "temp",
  initialState,
  reducers: {
    setIsTemp: (state, action: PayloadAction<boolean>) => {
        state.isTemp = action.payload;
    },
  },
});

/* Types */
export type TempState = {
    isTemp: boolean,
};
