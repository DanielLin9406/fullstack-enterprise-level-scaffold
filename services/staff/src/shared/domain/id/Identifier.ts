export class Identifier<T> {
  constructor(private value: T) {
    this.value = value;
  }

  /**
   * @method equals
   * @public
   * @desc
   */

  public equals(id?: Identifier<T>): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    if (!(id instanceof this.constructor)) {
      return false;
    }
    return id.toValue() === this.value;
  }

  /**
   * @method toString
   * @public
   * @desc
   */

  public toString() {
    return String(this.value);
  }

  /**
   * @method toValue
   * @public
   * @desc Return raw value of identifier
   */

  public toValue(): T {
    return this.value;
  }
}
