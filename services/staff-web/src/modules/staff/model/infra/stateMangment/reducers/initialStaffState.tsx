import { IStaffState } from "../stateModels/IStaffState";

const initialStaffState: IStaffState = {
  staff: {},
  isAuthenticated: false,
  // isFetchingUser: false,
  // isFetchingUserSuccess: false,
  // isFetchingUserFailure: false,

  isLoggingIn: false,
  isLoggingInSuccess: false,
  isLoggingInFailure: false,

  // isLoggingOut: false,
  // isLoggingOutSuccess: false,
  // isLoggingOutFailure: false,

  // isCreatingUser: false,
  // isCreatingUserSuccess: false,
  // isCreatingUserFailure: false,

  error: "",
};

export { initialStaffState };
