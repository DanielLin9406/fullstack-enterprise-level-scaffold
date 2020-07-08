import {
  TokenType,
  JWTToken,
  RefreshToken,
} from "../../stateMangment/stateModels/ITokens";

export interface IAuthService {
  isAuthenticated(): boolean;
  getToken(tokenType: TokenType): JWTToken | RefreshToken;
  setToken(tokenType: TokenType, token: JWTToken | RefreshToken): void;
  removeToken(tokenType: TokenType): void;
}

export class AuthService implements IAuthService {
  private getTokenName(tokenType: TokenType): string {
    // TODO
    return "token";
  }
  public isAuthenticated(): boolean {
    // TODO
    return true;
  }
  public removeToken(tokenType: TokenType): void {}
  public setToken(tokenType: TokenType, token: JWTToken | RefreshToken): void {}
  public getToken(tokenType: TokenType): JWTToken | RefreshToken {
    //TODO
    return "token";
  }
}
