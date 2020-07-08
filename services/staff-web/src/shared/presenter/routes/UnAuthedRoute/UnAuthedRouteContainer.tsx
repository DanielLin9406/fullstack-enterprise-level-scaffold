import { connect } from "react-redux";
import { UnAuthedRoute } from "./UnAuthedRoute";
import { IStaffState } from "../../../../modules/staff/model/infra/stateMangment/stateModels/IStaffState";
interface PropsFunction {
  ({ staff }: { staff: IStaffState }): { staff: IStaffState };
}
const mapStateToProps = ({ staff }: { staff: IStaffState }) => ({
  staff,
});
const UnAuthedRouteContainer = connect<PropsFunction, any>(
  mapStateToProps as any,
  null
)(UnAuthedRoute);

export { UnAuthedRouteContainer, UnAuthedRoute };
