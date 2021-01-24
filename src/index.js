import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import * as serviceWorker from "./serviceworker";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";
import StoryList from "./components/storyList";
import StoryDetail from "./components/storyDetail";

const routing = (
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <div>
          <Route path="/" exact component={App} />
          <Route path="/storyList" component={StoryList} />
          <Route path="/storyDetail" component={StoryDetail} />
        </div>
      </Router>
    </Provider>
  </React.StrictMode>
);
ReactDOM.render(routing, document.getElementById("root"));

serviceWorker.unregister();
export { Router, Route, Switch, withRouter } from "react-router-dom";
