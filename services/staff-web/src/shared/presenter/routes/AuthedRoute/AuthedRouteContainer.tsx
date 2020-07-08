import { connect } from "react-redux";
import { AuthedRoute } from "./AuthedRoute";
import { IStaffState } from "../../../../modules/staff/model/infra/stateMangment/stateModels/IStaffState";

const mapStateToProps = ({ staff }: { staff: IStaffState }) => {
  return {
    staff,
  };
};
const AuthedRouteContainer = connect(mapStateToProps, null)(AuthedRoute);

export { AuthedRouteContainer };
