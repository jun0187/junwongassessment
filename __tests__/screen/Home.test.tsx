import "react-native";
import React from "react";
import { beforeEach, describe, it } from "@jest/globals";
import { store } from "../../src/store";
import { act, fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import Home from "../../src/screen/Home";
import { NavigationContainer } from "@react-navigation/native";
import { setMovieDetail, setMovieList } from "../../src/reducer/movie.reducer";
import { movieDetailMock, movieListResMock } from "../../__mocks__/movie.mock";

describe("Home", () => {
  let renderUi: any = {};
  let curStore: any = {};

  beforeEach(() => {
    curStore = { ...store };
    act(() => {
      return curStore.dispatch(setMovieList(movieListResMock));
    });
    renderUi = render(
      <Provider store={curStore}>
        <Home />
      </Provider>
    );
  });

  it("renders Home correctly", () => {
    const { getByTestId } = renderUi;
    expect(getByTestId("test-drop-down")).toBeTruthy();
    expect(getByTestId("test-sort-button")).toBeTruthy();
    expect(getByTestId("test-flat-list")).toBeTruthy();
  });

  it("test dropdown", () => {
    const { getByTestId } = renderUi;
    const dropDown = getByTestId("test-drop-down");
    fireEvent.press(dropDown);
  });

  it("test sort button", () => {
    const { getByTestId } = renderUi;
    fireEvent.press(getByTestId("test-sort-button"));
  });

  it("test flatlist button", () => {
    const { getByTestId } = renderUi;
    // expect(getByTestId("test-movie-detail-0")).toBeTruthy();
    act(() => {
      getByTestId("test-flat-list").props.onRefresh();
    });
  });
  it("test flatlist button", async () => {
    const { getByTestId } = renderUi;
    // expect(getByTestId("test-movie-detail-0")).toBeTruthy();
    await act(async () => {
      await getByTestId("test-flat-list").props.onEndReached();
    });
  });
  it("", () => {});
});
