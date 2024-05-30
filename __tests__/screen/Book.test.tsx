import "react-native";
import React from "react";
import { beforeEach, describe, it } from "@jest/globals";
import { store } from "../../src/store";
import { act, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { setMovieDetail } from "../../src/reducer/movie.reducer";
import { movieDetailMock } from "../../__mocks__/movie.mock";
import Book from "../../src/screen/Book";

describe("Book", () => {
  let renderUi: any = {};
  let curStore: any = {};

  beforeEach(() => {
    curStore = { ...store };
    act(() => {
      return curStore.dispatch(setMovieDetail(movieDetailMock));
    });
    renderUi = render(
      <Provider store={curStore}>
        <Book />
      </Provider>
    );
  });

  it("renders Book correctly", () => {
    const { getByTestId } = renderUi;
    expect(getByTestId("test-web-view")).toBeTruthy();
  });
});
