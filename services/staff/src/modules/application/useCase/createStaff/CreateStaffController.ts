import { Response } from "express";
import { CreateStaffDTO } from "./CreateStaffDTO";
import { CreateStaffErrors } from "./CreateStaffErrors";
import { BaseController } from "../../../../shared/infra/http/restAPI/BaseController";
import { IDecodedRequest } from "../../../infra/http/restAPI/IDecodedRequest";
import { CreateStaffUseCase } from "./CreateStaffUseCase";
import { TextUtils } from "../../../../shared/application/middleware/TextUtils";

export class CreateStaffController extends BaseController {
  private useCase: CreateStaffUseCase;

  constructor(useCase: CreateStaffUseCase) {
    super();
    this.useCase = useCase;
  }

  /**
   * @method executeUseCase
   * @public async
   * @desc
   */

  public async executeUseCase(
    req: IDecodedRequest,
    res: Response
  ): Promise<any> {
    let dto: CreateStaffDTO = req.body as CreateStaffDTO;
    dto = {
      username: TextUtils.sanitize(dto.username),
      email: TextUtils.sanitize(dto.email),
      password: dto.password,
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case CreateStaffErrors.StaffnameTakenError:
            return this.conflict(error.errorValue().message);
          case CreateStaffErrors.EmailAlreadyExistsError:
            return this.conflict(error.errorValue().message);
          default:
            return this.fail(res, error.errorValue().message);
        }
      } else {
        return this.ok(res);
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
