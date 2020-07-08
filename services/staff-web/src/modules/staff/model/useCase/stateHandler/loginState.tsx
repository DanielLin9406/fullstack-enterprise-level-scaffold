import { IStaffAction } from "../../interaction/login/loginActionCreators";
import { LoginHandler } from "./loginHandler";
import {
  IState,
  AbstractState,
} from "../../../../../shared/model/interaction/controller/StateController";
import {
  loggingIn,
  loggingInSuccess,
  loggingInFailure,
} from "../../interaction/login/loginActionCreators";
import { staffService } from "../../infra/dataFetching/apis";
abstract class LoginState extends AbstractState implements IState {
  protected handler: LoginHandler;
  constructor(handler: LoginHandler) {
    super();
    this.handler = handler;
  }
}

class LoginReadyState extends LoginState {
  public executeDecisionLogic(): boolean {
    return true;
  }
  public executeStateMagement(
    dispatch: (actionObj: IStaffAction) => void
  ): void {
    dispatch(loggingIn());
    this.handler.transitionTo(new LoginFetchState(this.handler));
  }
}

class LoginFetchState extends LoginState {
  private payload: any;
  private error: Error | string;
  private result: any;
  constructor(handler: LoginHandler) {
    super(handler);
    this.error = "";
    this.result = "";
  }
  public async executeDataFetching(payload: any): Promise<any> {
    const { username, password } = payload;
    this.result = await staffService.login({ username, password });
    if (this.result.isLeft()) {
      this.error = this.result.value;
    } else {
      this.payload = this.result.value;
    }
  }
  public executeStateMagement(
    dispatch: (actionObj: IStaffAction) => void
  ): void {
    if (this.result.isLeft()) {
      this.handler.transitionTo(new LoginFailedState(this.handler, this.error));
    } else {
      this.handler.transitionTo(
        new LoginSucessState(this.handler, this.payload)
      );
    }
  }
}

class LoginSucessState extends LoginState {
  protected payload: any;
  constructor(handler: LoginHandler, payload: any) {
    super(handler);
    this.payload = payload;
  }
  public executeStateMagement(
    dispatch: (actionObj: IStaffAction) => void
  ): void {
    dispatch(loggingInSuccess(this.payload));
  }
}

class LoginFailedState extends LoginState {
  protected error: Error | string;
  constructor(handler: LoginHandler, error: Error | string) {
    super(handler);
    this.error = error;
  }
  public executeStateMagement(
    dispatch: (actionObj: IStaffAction) => void
  ): void {
    dispatch(loggingInFailure(this.error));
  }
}

export { LoginReadyState, LoginFetchState, LoginSucessState, LoginFailedState };
