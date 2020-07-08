import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { AuthedRouteContainer } from "./AuthedRoute/AuthedRouteContainer";
import { UnAuthedRouteContainer } from "./UnAuthedRoute/UnAuthedRouteContainer";
import { BasedRouteContainer } from "./BasedRoute/BaseRouteContainer";
import { page404 } from "../../../pages/system/404";
import getAllPages from "../../../pages/helper/helper";
import { pagesInfoList } from "../../../pages";
import { IPageProps } from "../../../pages";
import staffOperators from "../../../modules/staff/model/useCase";

const RoutesRoot: React.FC = ({ ...rest }) => (
  <Switch>
    {getAllPages(pagesInfoList).map((pageProps: any) => {
      switch (pageProps.authType) {
        case "authed":
          return (
            <AuthedRouteContainer
              key={pageProps.path}
              {...pageProps}
              {...rest}
            />
          );
        case "unAuthed":
          return (
            <UnAuthedRouteContainer
              key={pageProps.path}
              {...pageProps}
              {...rest}
            />
          );
        default:
          return (
            <BasedRouteContainer
              key={pageProps.path}
              {...pageProps}
              {...rest}
            />
          );
      }
    })}
    <Route component={page404} />
  </Switch>
);

const mapActionCreatorToProps = (dispatch: any) =>
  bindActionCreators(
    {
      ...staffOperators,
    },
    dispatch
  );

const RoutesRootContainer = connect(null, mapActionCreatorToProps)(RoutesRoot);

export { RoutesRoot, RoutesRootContainer };
