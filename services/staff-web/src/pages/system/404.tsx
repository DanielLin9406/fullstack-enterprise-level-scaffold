import React from "react";
import { hot } from "react-hot-loader";

const NotFound = () => {
  return <h2>NotFound</h2>;
};

const page404 = hot(module)(NotFound);

export { page404 };
