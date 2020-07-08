import jwt from "jsonwebtoken";
import randtoken from "rand-token";
import { ARedisClient } from "./redisClient";
import { IAuthService } from "../../../../shared/application/IAuthService";
import { RefreshToken, JWTToken, JWTClaims } from "../../../domain/jwt";
import { Staff } from "../../../domain/Staff";
import { authConfig } from "../../../../config";
export class RedisAuthService extends ARedisClient implements IAuthService {
  public jwtHashName: string = "activeJWTClients";

  /**
   * @method constructKey
   * @private
   * @desc
   */

  private constructKey(username: string, refreshToken: RefreshToken): string {
    return `refresh-${refreshToken}.${this.jwtHashName}.${username}`;
  }

  /**
   * @method refreshTokenExists
   * @public @async
   * @desc
   */
  public async refreshTokenExists(
    refreshToken: RefreshToken
  ): Promise<boolean> {
    const keys = await this.getAllKeys(`*${refreshToken}*`);
    return keys.length !== 0;
  }

  /**
   * @method signJWT
   * @public
   * @desc
   */

  public signJWT(props: JWTClaims): JWTToken {
    const claims: JWTClaims = {
      email: props.email,
      username: props.username,
      userId: props.userId,
      adminUser: props.adminUser,
      isEmailVerified: props.isEmailVerified,
    };

    return jwt.sign(claims, authConfig.secret, {
      expiresIn: authConfig.tokenExpiryTime,
    });
  }

  /**
   * @method decodeJWT
   * @public
   * @desc
   */

  public decodeJWT(token: string): Promise<JWTClaims> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return resolve(null);
        return resolve(decoded);
      });
    });
  }
  /**
   * @method createRefreshToken
   * @public
   * @desc
   */

  public createRefreshToken(): RefreshToken {
    return randtoken.uid(256) as RefreshToken;
  }

  /**
   * @method saveAuthenticatedUser
   * @public
   * @desc
   */

  public async saveAuthenticatedUser(staff: Staff): Promise<void> {
    if (staff.isLoggedIn()) {
      await this.addToken(
        staff.username.value,
        staff.refreshToken,
        staff.accessToken
      );
    }
  }

  /**
   * @method addToken
   * @public
   * @desc
   */

  public addToken(
    username: string,
    refreshToken: RefreshToken,
    token: JWTToken
  ): Promise<any> {
    return this.set(this.constructKey(username, refreshToken), token);
  }

  /**
   * @method deAuthenticateUser
   * @public
   * @desc
   */

  public async deAuthenticateUser(username: string): Promise<void> {}

  /**
   * @method clearAllSessions
   * @public @async
   * @desc
   */

  public async clearAllSessions(staffname: string): Promise<any> {
    const keyValues = await this.getAllKeyValue(
      `*${this.jwtHashName}.${staffname}`
    );
    const keys = keyValues.map((kv) => kv.key);
    return Promise.all(keys.map((key) => this.deleteOne(key)));
  }

  /**
   * @method getStaffNameFromRefreshToken
   * @public @async
   * @desc
   */

  public async getStaffNameFromRefreshToken(
    refreshToken: RefreshToken
  ): Promise<string> {
    const keys = await this.getAllKeys(`*${refreshToken}*`);
    const exists = keys.length !== 0;

    if (!exists) throw new Error("Username not found for refresh token.");

    const key = keys[0];

    return key.substring(
      key.indexOf(this.jwtHashName) + this.jwtHashName.length + 1
    );
  }

  /**
   * @method getTokens
   * @public
   * @desc
   */

  public async getTokens(staffname: string): Promise<string[]> {
    const keyValues = await this.getAllKeyValue(
      `*${this.jwtHashName}.${staffname}`
    );
    return keyValues.map((kv) => kv.value);
  }
}
