import { LoginHandler } from "./stateHandler/loginHandler";

const login = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const payload = { username, password };
  return async (dispatch: any, getState?: any) => {
    const loginHandler = new LoginHandler({ dispatch });
    loginHandler.runCommandInReadyState();
    await loginHandler.runCommandInFetchState(payload);
    loginHandler.runCommandInResultState();
  };
};

export { login };
