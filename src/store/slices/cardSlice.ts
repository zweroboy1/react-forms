import { createSlice } from '@reduxjs/toolkit';
import { FormData } from '../../types';

interface State {
  cards: FormData[];
}

const initialState: State = {
  cards: [],
};

export const cardSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addCard(state, action) {
      state.cards.unshift(action.payload);
    },
  },
});

export const { addCard } = cardSlice.actions;
export default cardSlice.reducer;
