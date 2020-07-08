import { UniqueEntityID } from "./ID/UniqueEntityID";

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

export abstract class Entity<T> {
  protected readonly _id: UniqueEntityID;
  public readonly props: T;

  constructor(props: T, id?: UniqueEntityID) {
    this._id = id ? id : new UniqueEntityID();
    this.props = props;
  }

  /**
   * @method equals
   * @public
   * @desc
   */

  public equals(entity?: Entity<T>): boolean {
    if (entity == null || entity == undefined) {
      return false;
    }
    if (this === entity) {
      return true;
    }
    if (!isEntity(entity)) {
      return false;
    }
    return this._id.equals(entity._id);
  }
}
