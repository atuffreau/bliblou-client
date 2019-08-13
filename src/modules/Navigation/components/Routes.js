import React, { Component } from "react";
import { arrayOf, shape, string, func } from "prop-types";
import { Switch } from "react-router-dom";

import AppliedRoutes from "./AppliedRoutes";
// import Home from "./Home";
// import Login from "./Login";
// // import ResetPassword from "../../../containers/ResetPassword";
// import NotFound from "./NotFound";

export const HOME = "/";
export const LOGIN = "/login";
export const LOST_PASSWORD = "/lostpassword";

class Routes extends Component {
  render() {
    const { routes, isAuthenticated } = this.props;

    return (
      <Switch>
        { 
          routes.map(({ path, component, ...rest }, index) => { 
            return !path 
              ? (<AppliedRoutes key={ `route-${index}` } 
                                component={ component } 
                                props={{ rest, isAuthenticated }} />)
              : (<AppliedRoutes key={ `route-${index}` } 
                                path={ path } 
                                exact 
                                component={ component } 
                                props={{ rest, isAuthenticated }} />)
          }) 
        }
        {/* <AppliedRoutes path={ HOME } exact component={ Home } props={childProps} /> */}
        {/* <AppliedRoutes path={ LOGIN } exact component={ Login } props={childProps} /> */}
        {/* <AppliedRoutes path={ LOST_PASSWORD } exact component={ ResetPassword } props={childProps} />*/}
      </Switch>
    );
  }
}

Routes.propTypes = {
  routes: arrayOf(shape({
    path: string,
    component: func.isRequired,
  })).isRequired,
}

export default Routes;
