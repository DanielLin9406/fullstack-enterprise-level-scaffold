import { createStore, applyMiddleware, compose, Store } from "redux";
import thunkMiddleware from "redux-thunk";
import { composedReducers } from "./ReducerRoot";

export const isServer = !(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

const encapsulatedStore = () => {
  const enhancers = [];
  const initialState = !isServer ? (window as any).__PRELOADED_STATE__ : {};
  const middlewareList = [thunkMiddleware];

  // Dev tools are helpful
  if (process.env.NODE_ENV === "development" && !isServer) {
    const devToolsExtension = (window as any).devToolsExtension;

    if (typeof devToolsExtension === "function") {
      enhancers.push(devToolsExtension());
    }
  }

  const composedEnhancers = compose(
    applyMiddleware(...middlewareList),
    ...enhancers
  );

  const store: Store = createStore(
    composedReducers,
    initialState,
    composedEnhancers
  );
  return store;
};

export { encapsulatedStore };
