/* Instruments */
import { counterSlice, editCardSlice } from "./slices";

export const reducer = {
  counter: counterSlice.reducer,
  editCard: editCardSlice.reducer,
};
