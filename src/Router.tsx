import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Default from "./components/layout/Layout";
import Loader from "./components/Loader";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

const isAuth = localStorage.getItem("isAuth") || true;
const token = localStorage.getItem("token") || true;

const Home = lazy(() => import("./pages/Home/index"));

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth && token ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      )
    }
  />
);

const NotAuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuth || !token ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/home",
          }}
        />
      )
    }
  />
);

export default function RouterView() {
  return (
    <Router>
      <Switch>
        <NotAuthenticatedRoute component={Login} exact path="/" />
        <NotAuthenticatedRoute component={Register} exact path="/register" />
        <Default>
          <Suspense fallback={<Loader />}>
            <PrivateRoute path="/home" component={Home}></PrivateRoute>
          </Suspense>
        </Default>
      </Switch>
    </Router>
  );
}
