import { StaffEmail } from "./StaffEmail";
import { StaffName } from "./StaffName";
import { StaffId } from "./StaffId";
import { StaffPassword } from "./StaffPassword";
import { JWTToken, RefreshToken } from "./jwt";
import { StaffCreated } from "./events/staffCreated";
import { StaffLoggedIn } from "./events/staffLoggedIn";
import { StaffDeleted } from "./events/staffDeleted";
import { UniqueEntityID } from "../../shared/domain/id/UniqueEntityID";
import { Result } from "../../shared/application/Result";
import { Guard } from "../../shared/application/Guard";
import { AggregateRoot } from "../../shared/domain/AggregateRoot";

interface IStaffProps {
  email: StaffEmail;
  username: StaffName;
  password: StaffPassword;
  isEmailVerified?: boolean;
  isAdminStaff?: boolean;
  accessToken?: JWTToken;
  refreshToken?: RefreshToken;
  isDeleted?: boolean;
  lastLogin?: Date;
}

export class Staff extends AggregateRoot<IStaffProps> {
  get userId(): StaffId {
    return StaffId.create(this._id).getValue();
  }
  get email(): StaffEmail {
    return this.props.email;
  }

  get username(): StaffName {
    return this.props.username;
  }

  get password(): StaffPassword {
    return this.props.password;
  }

  get isDeleted(): boolean {
    return this.props.isDeleted;
  }

  get isEmailVerified(): boolean {
    return this.props.isEmailVerified;
  }

  get isAdminStaff(): boolean {
    return this.props.isAdminStaff;
  }

  get accessToken(): string {
    return this.props.accessToken;
  }

  get refreshToken(): RefreshToken {
    return this.props.refreshToken;
  }

  private constructor(props: IStaffProps, id?: UniqueEntityID) {
    super(props, id);
  }

  /**
   * @method isLoggedIn
   * @static
   * @desc
   */

  public isLoggedIn(): boolean {
    return !!this.props.accessToken && !!this.props.refreshToken;
  }

  /**
   * @method delete
   * @static
   * @desc
   */

  public delete(): void {
    if (!this.props.isDeleted) {
      this.addDomainEvent(new StaffDeleted(this));
      this.props.isDeleted = true;
    }
  }

  /**
   * @method setAccessToken
   * @static
   * @desc
   */

  public setAccessToken(token: JWTToken, refreshToken: RefreshToken): void {
    this.addDomainEvent(new StaffLoggedIn(this));
    this.props.accessToken = token;
    this.props.refreshToken = refreshToken;
    this.props.lastLogin = new Date();
  }

  /**
   * @method create
   * @static
   * @desc
   */

  public static create(props: IStaffProps, id?: UniqueEntityID): Result<Staff> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.username, argumentName: "username" },
      { argument: props.email, argumentName: "email" },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<Staff>(guardResult.message);
    }

    const isNewUser = !!id === false;
    const user = new Staff(
      {
        ...props,
        isDeleted: props.isDeleted ? props.isDeleted : false,
        isEmailVerified: props.isEmailVerified ? props.isEmailVerified : false,
        isAdminStaff: props.isAdminStaff ? props.isAdminStaff : false,
      },
      id
    );

    if (isNewUser) {
      user.addDomainEvent(new StaffCreated(user));
    }

    return Result.ok<Staff>(user);
  }
}
