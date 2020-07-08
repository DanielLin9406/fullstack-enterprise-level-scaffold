import React from "react";
import { IStaffState } from "../../modules/staff/model/infra/stateMangment/stateModels/IStaffState";

interface LoginProps {
  staff: IStaffState;
}

const Login = ({ staff }: { staff: IStaffState }) => {
  return <div>Login</div>;
};

export { Login };
