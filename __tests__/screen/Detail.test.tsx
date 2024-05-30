import "react-native";
import React from "react";
import { beforeEach, describe, it } from "@jest/globals";
import { store } from "../../src/store";
import { act, fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { setMovieDetail } from "../../src/reducer/movie.reducer";
import { movieDetailMock } from "../../__mocks__/movie.mock";
import Detail from "../../src/screen/Detail";

describe("Detail", () => {
  let renderUi: any = {};
  let curStore: any = {};

  beforeEach(() => {
    curStore = { ...store };
    act(() => {
      return curStore.dispatch(setMovieDetail(movieDetailMock));
    });
    renderUi = render(
      <Provider store={curStore}>
        <Detail />
      </Provider>
    );
  });

  it("renders Detail correctly", () => {
    const { getByTestId } = renderUi;

    expect(getByTestId("test-detail-container")).toBeTruthy();
    expect(getByTestId("test-book-btn")).toBeTruthy();
  });

  it("test dropdown", () => {
    const { getByTestId } = renderUi;
    fireEvent.press(getByTestId("test-book-btn"));
  });

  it("test without poster_path link image", () => {
    act(() => {
      return curStore.dispatch(
        setMovieDetail({
          ...movieDetailMock,
          poster_path: null,
        })
      );
    });
  });

  it("test without poster_path and backdrop_path link image", () => {
    act(() => {
      return curStore.dispatch(
        setMovieDetail({
          ...movieDetailMock,
          poster_path: null,
          backdrop_path: "",
        })
      );
    });
  });
});
