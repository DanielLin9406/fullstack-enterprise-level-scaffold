import { Request } from "express";
import { JWTClaims } from "../../../domain/jwt";

export interface IDecodedRequest extends Request {
  decoded: JWTClaims;
}
