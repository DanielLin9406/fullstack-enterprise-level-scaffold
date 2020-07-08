import { Result } from "../../shared/application/Result";
import { Entity } from "../../shared/domain/Entity";
import { UniqueEntityID } from "../../shared/domain/id/UniqueEntityID";

export class StaffId extends Entity<any> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: UniqueEntityID): Result<StaffId> {
    return Result.ok<StaffId>(new StaffId(id));
  }
}
