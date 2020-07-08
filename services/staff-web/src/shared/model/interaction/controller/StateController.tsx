export interface IState {
  executeDecisionLogic(): boolean;
  executeStateMagement(dispatch: () => void): void;
  executeDataFetching<T>(payload: any): Promise<T> | undefined;
}

export abstract class AbstractState implements IState {
  public executeDecisionLogic(): boolean {
    return true;
  }
  public executeStateMagement(dispatch: () => void): void {}
  public executeDataFetching(payload: any): Promise<any> {
    return Promise.resolve();
  }
}
