/* eslint-disable no-param-reassign */
/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '@/supabase/types';

/* Types */
export type UserState = {
    user: IUser | undefined,
    isAuthenticated: boolean,
};

const initialState: UserState = {
  user: undefined,
  isAuthenticated: false,
};

export const sessionUserSlice = createSlice({
  name: 'sessionUser',
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuthenticated = action.payload !== undefined;
    },
    clear: (state: UserState) => {
      const newState = { ...state };
      newState.user = undefined;
      newState.isAuthenticated = false;
      return newState;
    },
  },
});
