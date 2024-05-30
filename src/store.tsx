import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import { combinedReducers } from "./reducer/index.reducer";
import rootSaga from "./saga/index.saga";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export const store = createStore(
  combinedReducers,
  applyMiddleware(...middlewares)
);

sagaMiddleware.run(rootSaga);

// export type RootState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;
