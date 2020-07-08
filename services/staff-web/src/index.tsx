import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { encapsulatedStore } from "./shared/model/infra/Store";
import { App } from "./App";

const Application = (
  <AppContainer>
    <Provider store={encapsulatedStore()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </AppContainer>
);

render(Application, document.querySelector("#root"));
