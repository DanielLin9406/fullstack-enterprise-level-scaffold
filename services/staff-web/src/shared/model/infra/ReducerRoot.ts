import { staff } from "../../../modules/staff/model/infra/stateMangment/reducers/staffReducers";
import { IStaffState } from "../../../modules/staff/model/infra/stateMangment/stateModels/IStaffState";
const composedReducers = (state: any = {}, action: any) => {
  return {
    staff: staff(state.staff, action),
  };
};

export { composedReducers };
