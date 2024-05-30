import "react-native";
import { describe } from "@jest/globals";
import { movieDetailMock, movieListResMock } from "../../__mocks__/movie.mock";
import {
  getMovieDetail,
  getMovieDetailAction,
  getMovieList,
  getMovieListAction,
} from "../../src/saga/movie.saga";
import { expectSaga } from "redux-saga-test-plan";

const axios = require("axios");
jest.mock("axios");

describe("Movie Saga", () => {
  describe("getMovieList", () => {
    test("success", async () => {
      const payload = {
        type: getMovieListAction.type,
        payload: {
          releaseDate: "2016-12-31",
          sortBy: "popularity.asc",
          page: 1,
        },
      };
      const response = Promise.resolve({
        status: "SUCCESS",
        data: movieListResMock,
      });

      axios.get.mockResolvedValue(response);
      return expectSaga(getMovieList, payload);
    });
  });
  describe("getMovieDetail", () => {
    test("success", async () => {
      const payload = {
        type: getMovieDetailAction.type,
        payload: {
          detailID: "string",
        },
      };
      const response = Promise.resolve({
        status: "SUCCESS",
        data: movieDetailMock,
      });
      axios.get.mockResolvedValue(response);
      return expectSaga(getMovieDetail, payload).run();
    });
  });
});
