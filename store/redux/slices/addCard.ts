/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: AddCardSliceState = {
  showPopup: false,
};

export const addCardSlice = createSlice({
  name: "editCard",
  initialState,
  reducers: {
    show: (state) => {
        state.showPopup = true;
    },
    hide: (state) => {
        state.showPopup = false;
    },
    setImage: (state, action: PayloadAction<EditCardImage>) => {
      state.image = action.payload;
    },
    reset: (state) => {
      state.image = undefined;
      state.showPopup = false;
    },
  },
});

/* Types */
interface EditCardImage {
  imageUrl: string,
  imageType: string
}

export type AddCardSliceState = {
    showPopup: boolean,
    image?: EditCardImage;
};
