import { cardsSlice, sessionUserSlice } from './slices';

/* Instruments */
export const reducer = {
  userCards: cardsSlice.reducer,
  sesssionUser: sessionUserSlice.reducer,
};
