interface ValueObjectProps {
  [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> {
  public props: T;
  constructor(props: T) {
    let baseProps: any = {
      ...props,
    };
    this.props = baseProps;
  }

  /**
   * @method equals
   * @public
   * @desc
   */

  public equals(VO?: ValueObject<T>): boolean {
    if (VO === null || VO === undefined) {
      return false;
    }
    if (VO.props === undefined) {
      return false;
    }
    return JSON.stringify(this.props) === JSON.stringify(VO.props);
  }
}
