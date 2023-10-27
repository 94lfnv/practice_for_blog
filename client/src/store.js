import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";

import createSagaMiddleware from "redux-saga";
import rootSaga from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
    //other options if needed
  });

export const store = createStore(
  combineReducers({
    router: routerReducer,
    //... reducers //your reducers!
  }),
  composeWithDevTools(applyMiddleware(routerMiddleware))
);

export const history = createReduxHistory(store);
