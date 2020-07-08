import { Loadable } from "./helper/loadable";
import { IStaffState } from "../modules/staff/model/infra/stateMangment/stateModels/IStaffState";

export interface IPageProps {
  authType: string;
  component: React.ReactNode;
  path: string;
  routes?: IPageProps[];
}

const pagePaths = {
  INDEX: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
};

const pagesInfoList = [
  {
    path: pagePaths.DASHBOARD,
    component: Loadable({
      loader: () =>
        // Note: Must use export default to export component
        import(
          /* webpackChunkName: "dashboard" */ "./Dashboard/DashboardPageContainer"
        ),
      modules: ["dashboard"],
    }),
    authType: "authed",
    exact: true,
  },
  {
    path: pagePaths.LOGIN,
    component: Loadable({
      loader: () =>
        // Note: Must use export default to export component
        import(/* webpackChunkName: "login" */ "./Login/LoginPageContainer"),
      modules: ["login"],
    }),
    authType: "unAuthed",
    exact: true,
  },
  {
    path: pagePaths.INDEX,
    component: undefined,
    predicate: () => {
      return false;
    },
    fallbackPath: "/dashboard",
    authType: "general",
    exact: true,
  },
];

export { pagePaths, pagesInfoList };
