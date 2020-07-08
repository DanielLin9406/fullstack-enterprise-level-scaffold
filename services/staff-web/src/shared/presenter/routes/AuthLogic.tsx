import React from "react";
import { Redirect, Route } from "react-router-dom";

interface AuthLogicProps {
  isLoggedIn: boolean;
  fallbackPath: string;
}

const AuthLogic: React.FC<AuthLogicProps> = ({
  isLoggedIn,
  fallbackPath = "/",
  ...props
}) => {
  return isLoggedIn ? <Route {...props} /> : <Redirect to={fallbackPath} />;
};

export { AuthLogic };
