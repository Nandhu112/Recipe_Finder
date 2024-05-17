// src/store/recipeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recipes: [],
  favorites: [],
};

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
  },
});

export const { addFavorite } = recipeSlice.actions;
export default recipeSlice.reducer;
