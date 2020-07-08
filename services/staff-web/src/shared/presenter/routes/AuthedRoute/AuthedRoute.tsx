import React from "react";
import { pagePaths } from "../../../../pages";
import { AuthLogic } from "../AuthLogic";
import { IStaffState } from "../../../../modules/staff/model/infra/stateMangment/stateModels/IStaffState";

interface AuthedRouteProps {
  staff: IStaffState;
}

const AuthedRoute: React.FC<AuthedRouteProps> = ({ staff, ...props }) => {
  const isLoggedIn = staff.isAuthenticated;
  return (
    <AuthLogic
      {...props}
      isLoggedIn={isLoggedIn}
      fallbackPath={pagePaths.LOGIN}
    />
  );
};

export { AuthedRoute };
