import { render } from "preact";
import { Provider } from "unistore/preact";
import { store } from "./lib/state";
import App from "./App";
import "./index.scss";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
