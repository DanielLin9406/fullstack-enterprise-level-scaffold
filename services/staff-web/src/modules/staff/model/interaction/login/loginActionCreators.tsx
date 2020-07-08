import {
  LOGGING_IN,
  LOGGING_IN_SUCCESS,
  LOGGING_IN_FAILURE,
  ILoginActionName,
} from "./loginActionNames";

export type IStaffAction = { [key: string]: ILoginActionName | any };

function loggingIn(): IStaffAction {
  return {
    type: LOGGING_IN,
  };
}
function loggingInSuccess(payload: any): IStaffAction {
  return {
    type: LOGGING_IN_SUCCESS,
    payload,
  };
}
function loggingInFailure(error: Error | string): IStaffAction {
  return {
    type: LOGGING_IN_FAILURE,
    error,
  };
}

export { loggingIn, loggingInSuccess, loggingInFailure };
