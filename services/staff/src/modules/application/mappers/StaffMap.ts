import { Mapper } from "../../../shared/application/IMapper";
import { Staff } from "../../domain/Staff";
import { IStaffDTO } from "../dtos/IStaffDTO";
import { StaffName } from "../../domain/staffName";
import { StaffPassword } from "../../domain/staffPassword";
import { StaffEmail } from "../../domain/staffEmail";
import { UniqueEntityID } from "../../../shared/domain/ID/UniqueEntityID";

export class StaffMap implements Mapper<Staff> {
  /**
   * @method toDTO
   * @static
   * @desc Mapping Domain to IStaffDTO
   */

  public static toDTO(staff: Staff): IStaffDTO {
    return {
      staffName: staff.username.value,
      isEmailVerified: staff.isEmailVerified,
      isAdminStaff: staff.isAdminStaff,
      isDeleted: staff.isDeleted,
    };
  }
  /**
   * @method toDomain
   * @static
   * @desc Mapping Staff in Repo to IStaffProps
   */

  public static toDomain(raw: any): Staff {
    const userNameOrError = StaffName.create({ name: raw.username });
    const userPasswordOrError = StaffPassword.create({
      value: raw.user_password,
      hashed: true,
    });
    const userEmailOrError = StaffEmail.create(raw.user_email);

    const userOrError = Staff.create(
      {
        username: userNameOrError.getValue(),
        password: userPasswordOrError.getValue(),
        email: userEmailOrError.getValue(),
      },
      new UniqueEntityID(raw.base_user_id)
    );

    userOrError.isFailure ? console.log(userOrError.error) : "";

    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  /**
   * @method toPersistence
   * @static @async
   * @desc Mapping Domain to Repo
   */

  public static async toPersistence(staff: Staff): Promise<any> {
    let password: string = null;

    return {
      base_user_id: staff.userId.id.toString(),
      user_email: staff.email.value,
      is_email_verified: staff.isEmailVerified,
      username: staff.username.value,
      user_password: password,
      is_admin_user: staff.isAdminStaff,
      is_deleted: staff.isDeleted,
    };
  }
}
