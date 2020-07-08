import React from "react";
import { Route } from "react-router-dom";

interface BaseRouteProps {}

const BaseRoute: React.FC<BaseRouteProps> = ({ ...props }) => {
  return <Route {...props} />;
};

export { BaseRoute };
