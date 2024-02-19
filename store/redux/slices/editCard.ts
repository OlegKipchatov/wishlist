/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: EditCardSliceState = {
  
};

export const editCardSlice = createSlice({
  name: "editCard",
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<EditCardImage>) => {
      state.image = action.payload;
    },
    reset: (state) => {
      state.image = undefined;
    },
  },
});

/* Types */
interface EditCardImage {
  imageUrl: string,
  imageType: string
}

export type EditCardSliceState = {
  image?: EditCardImage;
};
