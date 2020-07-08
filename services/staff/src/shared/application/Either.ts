export type Either<L, R> = Left<L, R> | Right<L, R>;

export class Left<L, R> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  /**
   * @method isLeft
   * @public
   * @desc
   */

  public isLeft(): this is Left<L, R> {
    return true;
  }

  /**
   * @method isRight
   * @public
   * @desc
   */

  public isRight(): this is Right<L, R> {
    return false;
  }
}

export class Right<L, R> {
  readonly value: R;

  constructor(value: R) {
    this.value = value;
  }

  /**
   * @method isLeft
   * @public
   * @desc
   */

  public isLeft(): this is Left<L, R> {
    return false;
  }

  /**
   * @method isRight
   * @public
   * @desc
   */

  public isRight(): this is Right<L, R> {
    return true;
  }
}

export const left = <L, R>(l: L): Either<L, R> => {
  return new Left(l);
};

export const right = <L, R>(r: R): Either<L, R> => {
  return new Right<L, R>(r);
};
