import { Staff } from "./IStaff";

export interface IStaffState {
  staff: Staff | {};
  isAuthenticated: boolean;
  // isFetchingUser: boolean;
  // isFetchingUserSuccess: boolean;
  // isFetchingUserFailure: boolean;

  isLoggingIn: boolean;
  isLoggingInSuccess: boolean;
  isLoggingInFailure: boolean;

  // isLoggingOut: boolean;
  // isLoggingOutSuccess: boolean;
  // isLoggingOutFailure: boolean;

  // isCreatingUser: boolean;
  // isCreatingUserSuccess: boolean;
  // isCreatingUserFailure: boolean;

  error: string;
}
