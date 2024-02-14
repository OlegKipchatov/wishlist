/* Instruments */
import { counterSlice, editCardSlice, popupSlice } from "./slices";

export const reducer = {
  counter: counterSlice.reducer,
  editCard: editCardSlice.reducer,
  popup: popupSlice.reducer,
};
