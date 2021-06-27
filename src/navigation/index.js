import ConsumerDashboard from "../screens/consumer/dashboard";
import LoginScreen from "../screens/auth/login";
import { connect } from "react-redux";
import React, { Suspense } from "react";
import Navbar from "../components/nav-bar";
import { Switch, Route, Redirect } from "react-router-dom";
import ErrorBoundary from "./error-boundary";
import LoadingContainer from "./loading-container";
import ApplicationContext from "../contexts/auth-context";
import AdminDashboard from "../screens/admin/admin-dashboard";
import Dashboard from "../screens/dashboard";

export const preload = (route) => {
  const loadableComponent = route.component;
  if (loadableComponent && loadableComponent.preload) {
    loadableComponent.preload();
  }
};

export const publicRoutes = [
  {
    key: "login",
    path: "/login",
    component: LoginScreen
  },
  {
    key: "root",
    path: "/",
    component: Dashboard
  }
];

export const privateRoutes = [
  {
    key: "consumer-dashboard",
    path: "/home",
    component: ConsumerDashboard
  },
  {
    key: "admin-dashboard",
    path: "/admin-dashboard",
    component: AdminDashboard
  },
  {
    key: "dashboard",
    path: "/dashboard",
    component: Dashboard
  }
];

const PrivateRoute = ({ component: Component, isAuthenticated, currentUserRole, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === false ? (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        ) : (
          <>
            <Navbar />
            <div className="ui container">
              <Component {...props} />
            </div>
          </>
        )
      }
    />
  );
};

const Navigation = (props) => {
  let isAuthenticated = props.isAuthenticated;
  const allOtherRoutes = privateRoutes.map((route, index) => {
    return (
      <PrivateRoute
        key={index}
        path={route.path}
        exact={true}
        component={route.component}
        isAuthenticated={isAuthenticated}
      />
    );
  });

  const PublicRoutes = publicRoutes.map(({ route, key, ...rest }) => (
    <Route {...rest} key={key} component={rest.component} exact={true} />
  ));

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingContainer />}>
        <ApplicationContext>
          <Switch>
            {PublicRoutes}
            {allOtherRoutes}
          </Switch>
        </ApplicationContext>
      </Suspense>
    </ErrorBoundary>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.session.isAuthenticated,
    currentUserRole: state.session.authorization && state.session.authorization.role
  };
};

export default connect(mapStateToProps)(Navigation);
