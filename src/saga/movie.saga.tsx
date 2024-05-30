import { PayloadAction, createAction } from "@reduxjs/toolkit";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { setMovieDetail, setMovieList } from "../reducer/movie.reducer";
import axios from "axios";
import { API } from "../constant";
import { MovieListRes } from "../interface";

export function* getMovieList(
  action: PayloadAction<{ releaseDate: string; sortBy: string; page: number }>
) {
  const { releaseDate, sortBy, page } = action.payload;

  try {
    if (page === 1) {
      yield put(setMovieList(null));
    }

    const movieList: MovieListRes = yield select(
      (state) => state.movie.movieList
    );

    yield put(setMovieList({ ...movieList, isLoading: true, isError: false }));

    const { data } = yield call(() => {
      return axios.get(API.LISTING_API, {
        params: {
          api_key: API.API_KEY,
          "primary_release_date.lte": releaseDate,
          sort_by: sortBy,
          page: page,
        },
      });
    });
    yield put(
      setMovieList({
        ...data,
        isLoading: false,
        results: movieList?.results
          ? [...movieList?.results, ...data.results]
          : data.results,
      })
    );
  } catch (e) {
    const movieList: MovieListRes = yield select(
      (state) => state.movie.movieList
    );
    yield put(setMovieList({ ...movieList, isLoading: false, isError: true }));
  }
}

export function* getMovieDetail(action: PayloadAction<{ detailID: string }>) {
  try {
    const { data } = yield call(() => {
      return axios.get(
        API.DETAIL_API.replace("{movieId}", action.payload.detailID),
        {
          params: {
            api_key: API.API_KEY,
          },
        }
      );
    });
    yield put(setMovieDetail(data));
  } catch (e) {
  } finally {
  }
}

export function* MovieSaga() {
  yield takeEvery(getMovieListAction.type, getMovieList);
  yield takeEvery(getMovieDetailAction.type, getMovieDetail);
}

export const getMovieListAction: any = createAction<{
  releaseDate: string;
  sortBy: string;
  page: number;
}>("getMovieListAction");

export const getMovieDetailAction: any = createAction<{
  detailID: string;
}>("getMovieDetailAction");
