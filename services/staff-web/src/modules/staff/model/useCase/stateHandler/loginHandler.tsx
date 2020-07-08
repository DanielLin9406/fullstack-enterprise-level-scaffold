import { LoginReadyState } from "./loginState";
import { IState } from "../../../../../shared/model/interaction/controller/StateController";

class LoginHandler {
  private state: IState;
  private dispatch: any;
  constructor({ dispatch }: { dispatch: any }) {
    this.state = new LoginReadyState(this);
    this.dispatch = dispatch;
    this.transitionTo(this.state);
  }
  public transitionTo(state: IState): void {
    this.state = state;
  }
  public runCommandInReadyState(): void {
    this.state.executeDecisionLogic(); //LoginReadyState
    this.state.executeStateMagement(this.dispatch); //LoginReadyState
  }
  public async runCommandInFetchState(payload: any): Promise<any> {
    await this.state.executeDataFetching(payload);
    this.state.executeStateMagement(this.dispatch);
  }
  public runCommandInResultState(): void {
    this.state.executeStateMagement(this.dispatch);
  }
}

export { LoginHandler };
