// import { combineReducers } from "redux";
// import { configureStore } from "@reduxjs/toolkit";
// import { createReduxHistoryContext } from "redux-first-history";
// import { createBrowserHistory } from "history";
// import authReducer from "./redux/reducers/authReducer";

// const { createReduxHistory, routerMiddleware, routerReducer } =
//   createReduxHistoryContext({ history: createBrowserHistory() });

// export const store = configureStore({
//   reducer: combineReducers({
//     router: routerReducer,
//     auth: authReducer,
//   }),
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(routerMiddleware),
// });

// export const history = createReduxHistory(store);

import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

import createRootReducer from "./redux/reducers/index";
import rootSaga from "./redux/sagas";

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const initialState = {};

const middlewares = [sagaMiddleware, routerMiddleware(history)];
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancer =
  process.env.NODE_ENV === "production" ? compose : devtools || compose;
// 개발자 도구일 때와 배포일 때 나누기

export const store = createStore(
  createRootReducer(history),
  initialState,
  composeEnhancer(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);
