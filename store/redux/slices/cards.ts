/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { ICard } from '@/supabase/types';

/* Types */
export type CardsState = {
    cards: ICard[],
};

const initialState: CardsState = {
  cards: [],
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state: CardsState, action: PayloadAction<ICard>) => {
      state.cards.push(action.payload);
    },
    updateCard: (state: CardsState, action: PayloadAction<ICard>) => {
      const newState = { ...state };
      newState.cards = state.cards.map((card) => (card.id === action.payload.id ? action.payload : card));
      return newState;
    },
    removeCard: (state: CardsState, action: PayloadAction<string>) => {
      const newState = { ...state };
      newState.cards = state.cards.filter((card) => card.id !== action.payload);
      return newState;
    },
    clear: (state: CardsState) => {
      const newState = { ...state };
      newState.cards = [];
      return newState;
    },
  },
});
