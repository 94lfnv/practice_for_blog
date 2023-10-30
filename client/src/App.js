import React from "react";
import { Provider } from "react-redux";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import { store, history } from "./store";
import MyRouter from "./routes/Router";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/custom.scss";

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <MyRouter />
      </Router>
    </Provider>
  );
};

export default App;
