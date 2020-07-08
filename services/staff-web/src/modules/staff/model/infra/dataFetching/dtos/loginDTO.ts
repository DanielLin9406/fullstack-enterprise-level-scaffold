import {
  JWTToken,
  RefreshToken,
} from "../../stateMangment/stateModels/ITokens";

export interface LoginDTO {
  accessToken: JWTToken;
  refreshToken: RefreshToken;
}
