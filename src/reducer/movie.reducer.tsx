import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MovieDetailRes, MovieListRes } from "../interface";

export interface MovieState {
  movieList: MovieListRes | null;
  movieDetail: MovieDetailRes | null;
}

const initialState: MovieState = {
  movieList: null,
  movieDetail: null,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovieList: (state, action: PayloadAction<MovieListRes | null>) => {
      state.movieList = action.payload;
    },
    setMovieDetail: (state, action: PayloadAction<MovieDetailRes | null>) => {
      state.movieDetail = action.payload;
    },
  },
});

export const { setMovieList, setMovieDetail } = movieSlice.actions;

export default movieSlice.reducer;
