import { initialStaffState } from "./initialStaffState";
import { IStaffState } from "../stateModels/IStaffState";
import {
  LOGGING_IN,
  LOGGING_IN_SUCCESS,
  LOGGING_IN_FAILURE,
  ILoginActionName,
} from "../../../interaction/login/loginActionNames";
import { IStaffAction } from "../../../interaction/login/loginActionCreators";

const staff = (
  state: IStaffState = initialStaffState,
  action: IStaffAction
): IStaffState => {
  switch (action.type as ILoginActionName) {
    case LOGGING_IN:
      return {
        ...state,
      };
    case LOGGING_IN_SUCCESS:
      return {
        ...state,
        staff: action.staff,
        isAuthenticated: true,
      };
    case LOGGING_IN_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export { staff };
