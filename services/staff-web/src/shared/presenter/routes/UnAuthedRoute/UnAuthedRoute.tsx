import React from "react";
import { pagePaths } from "../../../../pages";
import { AuthLogic } from "../AuthLogic";
import { IStaffState } from "../../../../modules/staff/model/infra/stateMangment/stateModels/IStaffState";

interface UnAuthedRouteProps {
  staff: IStaffState;
}

const UnAuthedRoute: React.FC<UnAuthedRouteProps> = ({ staff, ...props }) => {
  const isLoggedIn = !staff.isAuthenticated;
  return (
    <AuthLogic
      {...props}
      isLoggedIn={isLoggedIn || false}
      fallbackPath={pagePaths.DASHBOARD}
    />
  );
};

export { UnAuthedRoute };
