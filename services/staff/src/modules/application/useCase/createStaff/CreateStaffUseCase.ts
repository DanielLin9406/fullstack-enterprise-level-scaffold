import { Result } from "../../../../shared/application/Result";
import { left, right } from "../../../../shared/application/Either";
import { CreateStaffDTO } from "./CreateStaffDTO";
import { CreateStaffResponse } from "./CreateStaffResponse";
import { CreateStaffErrors } from "./CreateStaffErrors";
import { IStaffRepo } from "../../../infra/repos/StaffRepo";
import { AppError } from "../../../../shared/application/AppError";
import { StaffEmail } from "../../../domain/StaffEmail";
import { StaffPassword } from "../../../domain/StaffPassword";
import { StaffName } from "../../../domain/StaffName";
import { Staff } from "../../../domain/Staff";
import { IUseCase } from "../../../../shared/application/IUseCase";

export class CreateStaffUseCase
  implements IUseCase<CreateStaffDTO, Promise<CreateStaffResponse>> {
  private staffRepo: IStaffRepo;

  constructor(staffRepo: IStaffRepo) {
    this.staffRepo = staffRepo;
  }

  async execute(request: CreateStaffDTO): Promise<CreateStaffResponse> {
    const emailOrError = StaffEmail.create(request.email);
    const passwordOrError = StaffPassword.create({ value: request.password });
    const usernameOrError = StaffName.create({ name: request.username });

    const dtoResult = Result.combine([
      emailOrError,
      passwordOrError,
      usernameOrError,
    ]);

    if (dtoResult.isFailure) {
      return left(Result.fail<void>(dtoResult.error)) as CreateStaffResponse;
    }

    const email: StaffEmail = emailOrError.getValue();
    const password: StaffPassword = passwordOrError.getValue();
    const username: StaffName = usernameOrError.getValue();

    try {
      // Check StaffEmail has been taken or not?
      const staffAlreadyExists = await this.staffRepo.exists(email);

      if (staffAlreadyExists) {
        return left(
          new CreateStaffErrors.EmailAlreadyExistsError(email.value)
        ) as CreateStaffResponse;
      }

      // Check StaffName has been taken or not?
      const alreadyCreatedUserByUserName = await this.staffRepo.getUserByUserName(
        username
      );

      const userNameTaken = !!alreadyCreatedUserByUserName === true;

      if (userNameTaken) {
        return left(
          new CreateStaffErrors.StaffnameTakenError(username.value)
        ) as CreateStaffResponse;
      }

      // Create Staff
      const userOrError: Result<Staff> = Staff.create({
        email,
        password,
        username,
      });

      if (userOrError.isFailure) {
        return left(
          Result.fail<Staff>(userOrError.error.toString())
        ) as CreateStaffResponse;
      }

      // Save Staff
      const staff: Staff = userOrError.getValue();

      await this.staffRepo.save(staff);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as CreateStaffResponse;
    }
  }
}
