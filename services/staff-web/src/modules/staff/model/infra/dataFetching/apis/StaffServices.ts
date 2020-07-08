import { APIService } from "../../../../../../shared/model/infra/APIService";
import { Result } from "../../../../../../shared/model/infra/Result";
import {
  errorInstance,
  successInstance,
} from "../../../../../../shared/model/infra/EitherError";
import { IAuthService } from "./AuthServices";
import { APIResponse } from "../../../../../../shared/model/infra/IAPIResults";
import { LoginDTO } from "../dtos/loginDTO";

export interface IStaffService {
  login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<APIResponse<LoginDTO>>;
}

class StaffService extends APIService implements IStaffService {
  constructor({
    authService,
    baseURL,
    apiPort,
    apiVerson,
  }: {
    authService: IAuthService;
    baseURL: string;
    apiPort: string;
    apiVerson: string;
  }) {
    super({
      authService,
      baseURL,
      apiPort,
      apiVerson,
    });
  }
  public async login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<any> {
    const response = await this.post({
      url: "/staff/login",
      data: { username, password },
    });
    const dto: LoginDTO = response.data as LoginDTO;
    try {
      return successInstance(Result.ok<LoginDTO>(dto));
    } catch (err) {
      return errorInstance(
        err.response ? err.response.data.message : "Connection failed"
      );
    }
  }
}

export { StaffService };
