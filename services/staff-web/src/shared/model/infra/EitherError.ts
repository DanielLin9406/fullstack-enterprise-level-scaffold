export type EitherError<Err, Success> =
  | ErrorClass<Err, Success>
  | SuccessClass<Err, Success>;

class ErrorClass<Err, Success> {
  readonly value: Err;

  constructor(value: Err) {
    this.value = value;
  }

  isError(): this is ErrorClass<Err, Success> {
    return true;
  }

  isSuccess(): this is SuccessClass<Err, Success> {
    return false;
  }
}

class SuccessClass<Err, Success> {
  readonly value: Success;

  constructor(value: Success) {
    this.value = value;
  }

  isError(): this is ErrorClass<Err, Success> {
    return false;
  }

  isSuccess(): this is SuccessClass<Err, Success> {
    return true;
  }
}

export const errorInstance = <Err, Success>(
  e: Err
): EitherError<Err, Success> => {
  return new ErrorClass(e);
};

export const successInstance = <Err, Success>(
  s: Success
): EitherError<Err, Success> => {
  return new SuccessClass<Err, Success>(s);
};
