import { EitherError } from "./EitherError";
import { Result } from "./Result";

export type APIResponse<T> = EitherError<APIErrorMessage, Result<T>>;
export type APIErrorMessage = string;
