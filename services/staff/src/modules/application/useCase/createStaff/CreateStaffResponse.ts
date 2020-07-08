import { Either } from "../../../../shared/application/Either";
import { Result } from "../../../../shared/application/Result";
import { CreateStaffErrors } from "./CreateStaffErrors";
import { AppError } from "../../../../shared/application/AppError";

export type CreateStaffResponse = Either<
  | CreateStaffErrors.EmailAlreadyExistsError
  | CreateStaffErrors.StaffnameTakenError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;
