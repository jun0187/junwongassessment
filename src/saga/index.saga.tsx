import { all } from "redux-saga/effects";
import { MovieSaga } from "./movie.saga";

function* rootSaga() {
  yield all([MovieSaga()]);
}

export default rootSaga;
