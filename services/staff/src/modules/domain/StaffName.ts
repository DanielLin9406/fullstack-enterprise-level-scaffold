import { Result } from "../../shared/application/Result";
import { ValueObject } from "../../shared/domain/ValueObject";
import { Guard } from "../../shared/application/Guard";

interface IStaffNameProps {
  name: string;
}

export class StaffName extends ValueObject<IStaffNameProps> {
  public static maxLength: number = 15;
  public static minLength: number = 2;

  private constructor(props: IStaffNameProps) {
    super(props);
  }

  get value(): string {
    return this.props.name;
  }

  /**
   * @method create
   * @static
   * @desc
   */

  public static create(props: IStaffNameProps): Result<StaffName> {
    const staffNameResult = Guard.againstNullOrUndefined(
      props.name,
      "username"
    );
    if (!staffNameResult.succeeded) {
      return Result.fail<StaffName>(staffNameResult.message);
    }

    const minLengthResult = Guard.againstAtLeast(this.minLength, props.name);
    if (!minLengthResult.succeeded) {
      return Result.fail<StaffName>(minLengthResult.message);
    }

    const maxLengthResult = Guard.againstAtMost(this.maxLength, props.name);
    if (!maxLengthResult.succeeded) {
      return Result.fail<StaffName>(minLengthResult.message);
    }

    return Result.ok<StaffName>(new StaffName(props));
  }
}
