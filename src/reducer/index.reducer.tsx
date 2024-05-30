import { combineReducers, configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movie.reducer";

export const combinedReducers = combineReducers({
  movie: movieReducer,
});
