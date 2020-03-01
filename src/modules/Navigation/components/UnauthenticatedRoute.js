import React from "react";
import { Route, Redirect } from "react-router-dom";

import { RECIPES } from "./Routes";
import withBackgroundHandler from "./withBackgroundHandler";

function querystring(name, url = window.location.href) {
  name = name.replace(/[[]]/g, "\\$&");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  const results = regex.exec(url);

  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const UnauthenticatedRoute = ({ component: C, componentProps, isAuthenticated, ...rest }) => {
  const redirect = querystring("redirect");
  return (
    <Route { ...rest } render={ props => !isAuthenticated
      ? <C { ...props } { ...componentProps } />
      : <Redirect to={redirect === "" || redirect === null ? RECIPES : redirect} />
    } />
  );
};

export default withBackgroundHandler(UnauthenticatedRoute);